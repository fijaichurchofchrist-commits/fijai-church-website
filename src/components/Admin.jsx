import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaUpload,
  FaFilePdf,
  FaFileWord,
  FaTrash,
  FaCheckCircle,
  FaExclamationCircle,
  FaSpinner,
  FaSignOutAlt,
  FaBook
} from 'react-icons/fa';
import {
  uploadFile,
  addDocument,
  getDocuments,
  deleteDocument,
  formatFileSize,
  getFileType
} from '../services/documentService';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

const Admin = ({ onLogout }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    description: '',
    pages: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    'Faith Journey',
    'Spiritual Foundations',
    'Living Like Christ',
    'Gospel Truths',
    'Church Family'
  ];

  // Load documents on component mount
  useEffect(() => {
    loadDocuments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadDocuments = async () => {
    try {
      setIsLoading(true);
      const docs = await getDocuments();
      setDocuments(docs);
    } catch (error) {
      showMessage('error', 'Failed to load documents');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        showMessage('error', 'Please upload a PDF or Word document');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      showMessage('error', 'Please select a file to upload');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Upload file to Firebase Storage
      const { url, path } = await uploadFile(selectedFile, setUploadProgress);

      // Add document metadata to Firestore
      const documentData = {
        title: formData.title,
        author: formData.author,
        category: formData.category,
        description: formData.description,
        pages: formData.pages,
        fileType: getFileType(selectedFile.name),
        fileSize: formatFileSize(selectedFile.size),
        downloadUrl: url,
        filePath: path,
        date: new Date().toISOString()
      };

      await addDocument(documentData);

      // Reset form and reload documents
      setFormData({
        title: '',
        author: '',
        category: '',
        description: '',
        pages: ''
      });
      setSelectedFile(null);
      setUploadProgress(0);
      showMessage('success', 'Document uploaded successfully!');
      loadDocuments();
    } catch (error) {
      console.error('Upload error:', error);
      showMessage('error', 'Failed to upload document. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (documentId, filePath) => {
    if (!window.confirm('Are you sure you want to delete this document?')) {
      return;
    }

    try {
      await deleteDocument(documentId, filePath);
      showMessage('success', 'Document deleted successfully');
      loadDocuments();
    } catch (error) {
      showMessage('error', 'Failed to delete document');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      if (onLogout) onLogout();
    } catch (error) {
      showMessage('error', 'Failed to logout');
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'PDF':
        return <FaFilePdf className="text-red-500 text-2xl" />;
      case 'DOCX':
      case 'DOC':
        return <FaFileWord className="text-blue-500 text-2xl" />;
      default:
        return <FaBook className="text-gray-500 text-2xl" />;
    }
  };

  return (
    <div className="min-h-screen bg-soft-gray py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-bold text-accent mb-2">Admin Panel</h1>
            <p className="text-gray-600">Manage church documents and teachings</p>
          </motion.div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>

        {/* Message Display */}
        <AnimatePresence>
          {message.text && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
                message.type === 'success'
                  ? 'bg-green-50 border border-green-200 text-green-700'
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}
            >
              {message.type === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
              <span>{message.text}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-accent mb-6">Upload New Document</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="e.g., Walking in Faith"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Author *
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="e.g., Elder James Mensah"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Number of Pages *
                </label>
                <input
                  type="text"
                  name="pages"
                  value={formData.pages}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="e.g., 12 pages"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                  placeholder="Brief description of the document..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload File (PDF or Word) *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors"
                  >
                    <div className="text-center">
                      <FaUpload className="mx-auto text-3xl text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">
                        {selectedFile ? selectedFile.name : 'Click to upload file'}
                      </span>
                    </div>
                  </label>
                </div>
                {selectedFile && (
                  <p className="mt-2 text-sm text-gray-500">
                    Size: {formatFileSize(selectedFile.size)}
                  </p>
                )}
              </div>

              {/* Upload Progress */}
              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Uploading...</span>
                    <span>{Math.round(uploadProgress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                      className="bg-primary h-2 rounded-full"
                    ></motion.div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isUploading}
                className={`w-full py-4 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isUploading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-primary hover:bg-accent hover:shadow-lg hover:scale-[1.02]'
                }`}
              >
                {isUploading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <FaUpload />
                    <span>Upload Document</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Documents List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-accent mb-6">
              Uploaded Documents ({documents.length})
            </h2>

            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <FaSpinner className="animate-spin text-4xl text-primary" />
              </div>
            ) : documents.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <FaBook className="mx-auto text-5xl mb-4 opacity-30" />
                <p>No documents uploaded yet</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {documents.map((doc) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex-shrink-0 mt-1">
                      {getFileIcon(doc.fileType)}
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="font-bold text-accent truncate">{doc.title}</h4>
                      <p className="text-sm text-gray-600 truncate">{doc.author}</p>
                      <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500">
                        <span>{doc.category}</span>
                        <span>•</span>
                        <span>{doc.fileSize}</span>
                        <span>•</span>
                        <span>{doc.pages}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(doc.id, doc.filePath)}
                      className="flex-shrink-0 text-red-500 hover:text-red-700 transition-colors p-2"
                      title="Delete document"
                    >
                      <FaTrash />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
