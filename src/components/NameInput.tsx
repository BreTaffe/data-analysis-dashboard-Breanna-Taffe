import { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, RotateCcw } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  favoriteColor: string;
}

interface SavedData {
  name: string;
  email: string;
  timestamp: string;
}

const NameInput = () => {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    favoriteColor: 'blue',
  });

  // Submission and UI state
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [savedData, setSavedData] = useState<SavedData | null>(null);
  const [showSaved, setShowSaved] = useState(false);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('lastFormData');
    if (saved) {
      try {
        const parsedData: SavedData = JSON.parse(saved);
        setSavedData(parsedData);
      } catch (e) {
        console.error('Failed to parse saved data:', e);
      }
    }
  }, []);

  // Validation functions
  const validateName = (name: string): { valid: boolean; error: string } => {
    if (name.length === 0) {
      return { valid: false, error: 'Name is required' };
    }
    if (name.length < 2) {
      return { valid: false, error: 'Name must be at least 2 characters' };
    }
    if (!/^[a-zA-Z\s'-]+$/.test(name)) {
      return { valid: false, error: 'Name can only contain letters, spaces, hyphens, and apostrophes' };
    }
    return { valid: true, error: '' };
  };

  const validateEmail = (email: string): { valid: boolean; error: string } => {
    if (email.length === 0) {
      return { valid: true, error: '' }; // Email is optional
    }
    if (!email.includes('@') || !email.includes('.')) {
      return { valid: false, error: 'Email must contain @ and .' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { valid: false, error: 'Please enter a valid email address' };
    }
    return { valid: true, error: '' };
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear submission state when user modifies input
    setSubmitted(false);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate name
    const nameValidation = validateName(formData.name);
    if (!nameValidation.valid) {
      alert(nameValidation.error);
      return;
    }

    // Validate email (if provided)
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.valid) {
      alert(emailValidation.error);
      return;
    }

    // All validation passed
    setSubmitted(true);
    setSubmittedName(formData.name);

    // Save to localStorage
    const dataToSave: SavedData = {
      name: formData.name,
      email: formData.email,
      timestamp: new Date().toLocaleString(),
    };
    localStorage.setItem('lastFormData', JSON.stringify(dataToSave));
    setSavedData(dataToSave);

    // Clear form after successful submission
    setTimeout(() => {
      handleClear();
    }, 2000);
  };

  // Handle clear/reset
  const handleClear = () => {
    setFormData({
      name: '',
      email: '',
      favoriteColor: 'blue',
    });
    setSubmitted(false);
    setSubmittedName('');
  };

  // Handle loading saved data
  const loadSavedData = () => {
    if (savedData) {
      setFormData(prev => ({
        ...prev,
        name: savedData.name,
        email: savedData.email,
      }));
      setShowSaved(false);
    }
  };

  const nameValidation = validateName(formData.name);
  const emailValidation = validateEmail(formData.email);

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Welcome!
      </h2>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input Field */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition-colors ${
              submitted && nameValidation.valid
                ? 'border-green-500 bg-green-50'
                : formData.name && !nameValidation.valid
                ? 'border-red-500 bg-red-50'
                : 'border-gray-300 focus:border-blue-500'
            }`}
          />
          {/* Character count */}
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500">
              {formData.name.length} characters
            </p>
            {/* Validation feedback */}
            {formData.name && !nameValidation.valid ? (
              <div className="flex items-center gap-1 text-red-600 text-xs">
                <AlertCircle className="h-4 w-4" />
                <span>{nameValidation.error}</span>
              </div>
            ) : formData.name && nameValidation.valid ? (
              <div className="flex items-center gap-1 text-green-600 text-xs">
                <CheckCircle2 className="h-4 w-4" />
                <span>Looking good!</span>
              </div>
            ) : null}
          </div>
        </div>

        {/* Email Input Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
            Email (Optional)
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="your.email@example.com"
            className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition-colors ${
              submitted && emailValidation.valid && formData.email
                ? 'border-green-500 bg-green-50'
                : formData.email && !emailValidation.valid
                ? 'border-red-500 bg-red-50'
                : 'border-gray-300 focus:border-blue-500'
            }`}
          />
          {/* Email validation feedback */}
          {formData.email && !emailValidation.valid ? (
            <div className="flex items-center gap-1 text-red-600 text-xs">
              <AlertCircle className="h-4 w-4" />
              <span>{emailValidation.error}</span>
            </div>
          ) : formData.email && emailValidation.valid ? (
            <div className="flex items-center gap-1 text-green-600 text-xs">
              <CheckCircle2 className="h-4 w-4" />
              <span>Email looks valid!</span>
            </div>
          ) : null}
        </div>

        {/* Color Dropdown */}
        <div className="space-y-2">
          <label htmlFor="favoriteColor" className="block text-sm font-semibold text-gray-700">
            Favorite Color
          </label>
          <div className="flex gap-2 items-center">
            <select
              id="favoriteColor"
              name="favoriteColor"
              value={formData.favoriteColor}
              onChange={handleInputChange}
              className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="red">Red</option>
              <option value="purple">Purple</option>
              <option value="orange">Orange</option>
              <option value="pink">Pink</option>
            </select>
            {/* Color preview */}
            <div
              className="w-10 h-10 rounded-lg border-2 border-gray-300"
              style={{
                backgroundColor: formData.favoriteColor === 'blue' ? '#3b82f6'
                  : formData.favoriteColor === 'green' ? '#10b981'
                  : formData.favoriteColor === 'red' ? '#ef4444'
                  : formData.favoriteColor === 'purple' ? '#a855f7'
                  : formData.favoriteColor === 'orange' ? '#f97316'
                  : '#ec4899',
              }}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={!formData.name || !nameValidation.valid}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
              !formData.name || !nameValidation.valid
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600 active:scale-95'
            }`}
          >
            ✓ Submit
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="flex-1 py-2 px-4 rounded-lg font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors active:scale-95 flex items-center justify-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Clear
          </button>
        </div>
      </form>

      {/* Success Message */}
      {submitted && (
        <div className="mt-6 p-4 bg-green-50 border-2 border-green-500 rounded-lg text-center animate-pulse">
          <p className="text-lg font-semibold text-green-700">
            🎉 Welcome, {submittedName}!
          </p>
          <p className="text-sm text-green-600 mt-1">
            Your favorite color is {formData.favoriteColor}!
          </p>
          {formData.email && (
            <p className="text-xs text-green-600 mt-1">
              We'll contact you at {formData.email}
            </p>
          )}
        </div>
      )}

      {/* Saved Data Section */}
      {savedData && (
        <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-300 rounded-lg">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-sm font-semibold text-blue-800">📋 Last Saved Data</p>
              <p className="text-xs text-blue-600 mt-1">Name: {savedData.name}</p>
              {savedData.email && (
                <p className="text-xs text-blue-600">Email: {savedData.email}</p>
              )}
              <p className="text-xs text-blue-500 mt-2">Saved: {savedData.timestamp}</p>
            </div>
            <button
              type="button"
              onClick={() => setShowSaved(!showSaved)}
              className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
            >
              {showSaved ? '−' : '+'}
            </button>
          </div>
          {showSaved && (
            <button
              type="button"
              onClick={loadSavedData}
              className="w-full mt-2 py-2 px-3 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
            >
              Load Saved Data
            </button>
          )}
        </div>
      )}

      {/* Educational Footer */}
      <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded text-sm text-yellow-800">
        <p className="font-semibold mb-1">💡 What You're Learning:</p>
        <ul className="text-xs space-y-1 list-disc list-inside">
          <li>Controlled components with useState</li>
          <li>Real-time input validation</li>
          <li>Conditional rendering for error/success states</li>
          <li>localStorage for data persistence</li>
          <li>Form event handling and submission</li>
        </ul>
      </div>
    </div>
  );
};

export default NameInput;