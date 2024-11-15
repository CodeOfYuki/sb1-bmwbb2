import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, FileText, BriefcaseIcon } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';

export default function SettingsPage() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [mainCV, setMainCV] = useState<File | null>(null);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [jobPreferences, setJobPreferences] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [applicationUpdates, setApplicationUpdates] = useState(true);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMainCV(file);
    }
  };

  return (
    <AuthLayout>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Profile Settings */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Profile Settings</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Update your personal information
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="w-12 h-12 text-[#6956A8]" />
                      </div>
                    )}
                    <label
                      htmlFor="profile-upload"
                      className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-lg cursor-pointer"
                    >
                      <input
                        id="profile-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <div className="w-8 h-8 bg-[#6956A8] rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    </label>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Profile Picture</h4>
                    <p className="text-sm text-gray-500">
                      JPG, GIF or PNG. Max size of 800K
                    </p>
                  </div>
                </div>

                {/* CV Upload */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-6 w-6 text-[#6956A8]" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Resume/CV</h4>
                      <p className="text-sm text-gray-500">
                        {mainCV ? mainCV.name : 'No file uploaded'}
                      </p>
                    </div>
                  </div>
                  <label
                    htmlFor="cv-upload"
                    className="btn-primary rounded-lg px-4 py-2 cursor-pointer"
                  >
                    {mainCV ? 'Update CV' : 'Upload CV'}
                    <input
                      id="cv-upload"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={handleCVUpload}
                    />
                  </label>
                </div>

                {/* Job Preferences */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <BriefcaseIcon className="h-6 w-6 text-[#6956A8]" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Job Preferences</h4>
                      <p className="text-sm text-gray-500">
                        Describe your ideal role and current situation
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <textarea
                      value={jobPreferences}
                      onChange={(e) => setJobPreferences(e.target.value)}
                      rows={6}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-[#6956A8] focus:border-[#6956A8] text-sm"
                      placeholder="Example: I'm a senior software engineer with 5 years of experience, currently looking for remote positions in fintech or healthtech. I specialize in React and Node.js, and I'm particularly interested in roles that involve mentoring junior developers..."
                    />
                    <div className="mt-2 text-sm text-gray-500">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Describe your ideal work environment (remote, hybrid, on-site)</li>
                        <li>Mention your preferred industries and company sizes</li>
                        <li>List your key skills and areas of expertise</li>
                        <li>Share your career goals and what you're looking for in your next role</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-[#6956A8]" />
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#6956A8] focus:ring-[#6956A8] sm:text-sm"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-[#6956A8]" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#6956A8] focus:ring-[#6956A8] sm:text-sm"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="btn-primary rounded-lg px-4 py-2">
                    Save Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Notification Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      Email Notifications
                    </h4>
                    <p className="text-sm text-gray-500">
                      Receive updates about your account via email
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={emailNotifications}
                      onChange={(e) => setEmailNotifications(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#6956A8]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6956A8]"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      Application Updates
                    </h4>
                    <p className="text-sm text-gray-500">
                      Get notified when your applications receive responses
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={applicationUpdates}
                      onChange={(e) => setApplicationUpdates(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#6956A8]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6956A8]"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Security Settings
              </h3>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <Lock className="h-5 w-5 text-[#6956A8] mr-3" />
                    <div className="text-left">
                      <h4 className="text-sm font-medium text-gray-900">
                        Change Password
                      </h4>
                      <p className="text-sm text-gray-500">
                        Update your password regularly to keep your account secure
                      </p>
                    </div>
                  </div>
                  <div className="text-[#6956A8]">Change</div>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AuthLayout>
  );
}