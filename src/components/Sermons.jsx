import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaFileAlt, FaFilePdf, FaFileWord, FaUser, FaSearch, FaBook, FaSpinner } from 'react-icons/fa';
import { getDocuments } from '../services/documentService';
import sermonsData from '../data/sermons.json';

const Sermons = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Load documents from Firebase on component mount and set up auto-reload
  useEffect(() => {
    loadDocuments();

    // Auto-reload every 30 seconds to get new documents
    const interval = setInterval(() => {
      loadDocuments();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const loadDocuments = async () => {
    try {
      setIsLoading(true);
      const firebaseDocs = await getDocuments();
      if (firebaseDocs && firebaseDocs.length > 0) {
        setDocuments(firebaseDocs);
      } else {
        // Fallback to JSON data if Firebase is empty
        setDocuments(sermonsData);
      }
    } catch (error) {
      console.log('Using local data (Firebase not configured yet)');
      setDocuments(sermonsData);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter documents by search query
  const filteredDocuments = documents.filter((document) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const titleMatch = document.title?.toLowerCase().includes(query);
    const descriptionMatch = document.description?.toLowerCase().includes(query);
    const authorMatch = document.author?.toLowerCase().includes(query);
    return titleMatch || descriptionMatch || authorMatch;
  });

  // Get suggestions for autocomplete (limit to 5)
  const suggestions = searchQuery.trim()
    ? filteredDocuments.slice(0, 5)
    : [];

  // Handle suggestion click - open/download the document
  const handleSuggestionClick = (downloadUrl) => {
    window.open(downloadUrl, '_blank');
    setShowSuggestions(false);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true);
  };

  // Helper function to get file icon
  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'PDF':
        return <FaFilePdf className="text-red-500" />;
      case 'DOCX':
      case 'DOC':
        return <FaFileWord className="text-blue-500" />;
      default:
        return <FaFileAlt className="text-gray-500" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="sermons" className="py-20 bg-soft-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-accent mb-4">Scriptures & Teachings</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Download and study inspiring messages from God's Word
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <FaSpinner className="animate-spin text-6xl text-primary" />
          </div>
        ) : (
          <>
        {/* Featured Document */}
        {documents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="bg-gradient-to-r from-primary to-accent rounded-2xl overflow-hidden shadow-2xl">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative bg-white/10 backdrop-blur-sm flex items-center justify-center min-h-[300px]">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="text-white"
                  >
                    <FaBook className="text-9xl opacity-30" />
                  </motion.div>
                  <div className="absolute top-6 left-6">
                    <div className="flex items-center space-x-2 text-white">
                      {getFileIcon(documents[0].fileType)}
                      <span className="font-semibold text-sm bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                        {documents[0].fileType}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-8 md:p-12 text-white flex flex-col justify-center">
                  <span className="text-light-blue font-semibold mb-2">LATEST TEACHING</span>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">
                    {documents[0].title}
                  </h3>
                  <p className="text-light-blue mb-4">{documents[0].description}</p>
                  <div className="flex flex-wrap gap-4 text-sm mb-6">
                    <span className="flex items-center">
                      <FaUser className="mr-2" /> {documents[0].author}
                    </span>
                    <span className="flex items-center">
                      <FaFileAlt className="mr-2" /> {documents[0].pages}
                    </span>
                  </div>
                  <a
                    href={documents[0].downloadUrl}
                    download
                    className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-light-blue transition-all duration-300 hover:shadow-lg hover:scale-105 w-fit flex items-center space-x-2"
                  >
                    <FaDownload />
                    <span>Download ({documents[0].fileSize})</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="max-w-md mx-auto">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
              <input
                type="text"
                placeholder="Search by title, description, or author..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="w-full pl-12 pr-10 py-3 rounded-full border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setShowSuggestions(false);
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
                >
                  ×
                </button>
              )}

              {/* Autocomplete Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-20">
                  {suggestions.map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => handleSuggestionClick(doc.downloadUrl)}
                      className="flex items-center px-4 py-3 hover:bg-light-blue cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex-shrink-0 mr-3">
                        {getFileIcon(doc.fileType)}
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="font-semibold text-accent truncate">{doc.title}</p>
                        <p className="text-xs text-gray-500 truncate">{doc.author}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {searchQuery && !showSuggestions && (
              <p className="text-center text-sm text-gray-500 mt-2">
                Found {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        </motion.div>

        {/* Documents Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredDocuments.slice(1).map((document, index) => (
            <motion.div
              key={document.id}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.03 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative group">
                <div className="w-full h-48 bg-gradient-to-br from-light-blue to-white flex items-center justify-center border-b-2 border-primary">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="text-7xl"
                  >
                    {getFileIcon(document.fileType)}
                  </motion.div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {document.fileType}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-accent mb-2 line-clamp-2">
                  {document.title}
                </h4>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {document.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <FaUser className="mr-1" /> {document.author.split(' ')[1]}
                  </span>
                  <span className="flex items-center">
                    <FaFileAlt className="mr-1" /> {document.pages}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-400">
                    {new Date(document.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                  <a
                    href={document.downloadUrl}
                    download
                    className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-accent transition-all duration-300 hover:shadow-lg flex items-center space-x-2"
                  >
                    <FaDownload className="text-xs" />
                    <span>{document.fileSize}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            {searchQuery ? `No documents found for "${searchQuery}"` : 'No documents available yet.'}
          </div>
        )}
        </>
        )}
      </div>
    </section>
  );
};

export default Sermons;
