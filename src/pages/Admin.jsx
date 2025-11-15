import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaUsers, FaCopy, FaDownload, FaPaperPlane, FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';
import { db } from '../firebase/config';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import emailjs from '@emailjs/browser';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  const [subscribers, setSubscribers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState('');
  const [statusType, setStatusType] = useState(''); // 'success' or 'error'

  // Simple password authentication - Change this password!
  const ADMIN_PASSWORD = 'fijai2024'; // Change this to your own secure password

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError('');
      localStorage.setItem('admin_auth', 'true');
    } else {
      setAuthError('Incorrect password');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
  };

  // Check if already authenticated
  useEffect(() => {
    if (localStorage.getItem('admin_auth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Load subscribers when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadSubscribers();
    }
  }, [isAuthenticated]);

  const loadSubscribers = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, 'newsletter_subscribers'), orderBy('subscribedAt', 'desc'));
      const querySnapshot = await getDocs(q);

      const subs = [];
      querySnapshot.forEach((doc) => {
        subs.push({
          id: doc.id,
          ...doc.data(),
          subscribedAt: doc.data().subscribedAt?.toDate() || new Date()
        });
      });

      setSubscribers(subs);
    } catch (error) {
      console.error('Error loading subscribers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyEmailsToClipboard = () => {
    const emails = subscribers.map(sub => sub.email).join(', ');
    navigator.clipboard.writeText(emails);
    setStatusType('success');
    setSendStatus('Emails copied to clipboard!');
    setTimeout(() => setSendStatus(''), 3000);
  };

  const downloadCSV = () => {
    const headers = ['Email', 'Subscribed Date', 'Status'];
    const rows = subscribers.map(sub => [
      sub.email,
      sub.subscribedAt.toLocaleDateString(),
      sub.status
    ]);

    const csv = [headers, ...rows]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter_subscribers_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const sendNewsletter = async (e) => {
    e.preventDefault();

    if (subscribers.length === 0) {
      setStatusType('error');
      setSendStatus('No subscribers to send to!');
      setTimeout(() => setSendStatus(''), 3000);
      return;
    }

    if (!emailSubject || !emailMessage) {
      setStatusType('error');
      setSendStatus('Please fill in both subject and message!');
      setTimeout(() => setSendStatus(''), 3000);
      return;
    }

    setIsSending(true);

    try {
      // EmailJS configuration
      // You'll need to set up EmailJS and add your credentials
      const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS not configured. Please check EMAILJS_SETUP.md');
      }

      // Send emails in batches to avoid overwhelming the service
      const batchSize = 10;
      let successCount = 0;
      let failCount = 0;

      for (let i = 0; i < subscribers.length; i += batchSize) {
        const batch = subscribers.slice(i, i + batchSize);

        const promises = batch.map(subscriber =>
          emailjs.send(
            serviceId,
            templateId,
            {
              to_email: subscriber.email,
              subject: emailSubject,
              message: emailMessage,
              from_name: 'Church of Christ Fijai'
            },
            publicKey
          )
        );

        const results = await Promise.allSettled(promises);
        results.forEach(result => {
          if (result.status === 'fulfilled') {
            successCount++;
          } else {
            failCount++;
          }
        });

        // Small delay between batches
        if (i + batchSize < subscribers.length) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      setStatusType('success');
      setSendStatus(`Newsletter sent! ${successCount} successful, ${failCount} failed.`);
      setEmailSubject('');
      setEmailMessage('');
    } catch (error) {
      console.error('Error sending newsletter:', error);
      setStatusType('error');
      setSendStatus(error.message || 'Failed to send newsletter. Please try again.');
    } finally {
      setIsSending(false);
      setTimeout(() => setSendStatus(''), 5000);
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary to-accent flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
              <FaEnvelope className="text-4xl text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-accent mb-2">Admin Panel</h1>
            <p className="text-gray-600">Newsletter Management</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Enter admin password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {authError && (
              <p className="text-red-500 text-sm">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-accent transition-colors"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Protected Area - Authorized Access Only</p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-accent">Newsletter Admin</h1>
            <p className="text-gray-600 mt-2">Manage subscribers and send newsletters</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Subscribers</p>
                <p className="text-3xl font-bold text-primary mt-2">{subscribers.length}</p>
              </div>
              <div className="p-4 bg-primary/10 rounded-full">
                <FaUsers className="text-2xl text-primary" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Subscribers</p>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  {subscribers.filter(s => s.status === 'active').length}
                </p>
              </div>
              <div className="p-4 bg-green-100 rounded-full">
                <FaEnvelope className="text-2xl text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">This Month</p>
                <p className="text-3xl font-bold text-accent mt-2">
                  {subscribers.filter(s => {
                    const monthAgo = new Date();
                    monthAgo.setMonth(monthAgo.getMonth() - 1);
                    return s.subscribedAt >= monthAgo;
                  }).length}
                </p>
              </div>
              <div className="p-4 bg-accent/10 rounded-full">
                <FaPaperPlane className="text-2xl text-accent" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Subscribers List */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-accent">Subscribers</h2>
              <div className="flex gap-2">
                <button
                  onClick={copyEmailsToClipboard}
                  className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                  title="Copy all emails"
                >
                  <FaCopy />
                </button>
                <button
                  onClick={downloadCSV}
                  className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                  title="Download CSV"
                >
                  <FaDownload />
                </button>
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <FaSpinner className="animate-spin text-4xl text-primary" />
              </div>
            ) : subscribers.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <FaUsers className="text-4xl mx-auto mb-4 opacity-50" />
                <p>No subscribers yet</p>
              </div>
            ) : (
              <div className="max-h-96 overflow-y-auto">
                {subscribers.map((subscriber, index) => (
                  <motion.div
                    key={subscriber.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg mb-2"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{subscriber.email}</p>
                      <p className="text-sm text-gray-500">
                        {subscriber.subscribedAt.toLocaleDateString()}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                      {subscriber.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Send Newsletter */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h2 className="text-2xl font-bold text-accent mb-6">Send Newsletter</h2>

            <form onSubmit={sendNewsletter} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Newsletter subject..."
                  disabled={isSending}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                  rows={12}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                  placeholder="Write your newsletter message here..."
                  disabled={isSending}
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <p className="text-sm text-gray-600">
                  Send to {subscribers.length} subscriber{subscribers.length !== 1 ? 's' : ''}
                </p>
                <button
                  type="submit"
                  disabled={isSending || subscribers.length === 0}
                  className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSending ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Newsletter
                    </>
                  )}
                </button>
              </div>

              {sendStatus && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`p-4 rounded-lg ${
                    statusType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}
                >
                  {sendStatus}
                </motion.div>
              )}
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Note:</strong> Make sure EmailJS is configured in your .env.local file.
                See EMAILJS_SETUP.md for instructions.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
