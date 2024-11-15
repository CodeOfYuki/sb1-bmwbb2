import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, FileText, Info } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import CampaignBreadcrumbs from '../components/CampaignBreadcrumbs';
import CompanySearch from '../components/CompanySearch';
import CreditAllocation from '../components/CreditAllocation';
import CoverLetterGenerator from '../components/CoverLetterGenerator';

interface Company {
  id: string;
  name: string;
}

interface FormData {
  jobTitle: string;
  industry: string;
  jobType: string;
  location: string;
  description: string;
  blacklistedCompanies: Company[];
  credits: number;
}

const initialFormData: FormData = {
  jobTitle: '',
  industry: '',
  jobType: '',
  location: '',
  description: '',
  blacklistedCompanies: [],
  credits: 0,
};

export default function CampaignsPage() {
  const [showForm, setShowForm] = useState(false);
  const [currentStep, setCurrentStep] = useState<'details' | 'template'>('details');
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  const handleStepClick = (step: 'details' | 'template') => {
    if (step === 'details' || (step === 'template' && validateForm())) {
      setCurrentStep(step);
    }
  };

  const validateForm = () => {
    const requiredFields = ['jobTitle', 'industry', 'jobType', 'location', 'description'];
    return requiredFields.every(field => formData[field as keyof FormData]);
  };

  const isStepValid = (step: 'details' | 'template') => {
    if (step === 'details') return true;
    return validateForm();
  };

  const handleCompanySelect = (company: Company) => {
    setFormData(prev => ({
      ...prev,
      blacklistedCompanies: [...prev.blacklistedCompanies, company],
    }));
  };

  const handleCompanyRemove = (companyId: string) => {
    setFormData(prev => ({
      ...prev,
      blacklistedCompanies: prev.blacklistedCompanies.filter(c => c.id !== companyId),
    }));
  };

  const handleCreditAllocation = (credits: number) => {
    setFormData(prev => ({
      ...prev,
      credits,
    }));
  };

  const handleTemplateSelect = (content: string) => {
    setSelectedTemplate(content);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle campaign creation
      console.log('Creating campaign:', { ...formData, template: selectedTemplate });
      setShowForm(false);
      setFormData(initialFormData);
      setCurrentStep('details');
    }
  };

  return (
    <AuthLayout>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
              <p className="mt-1 text-sm text-gray-500">
                Create and manage your job application campaigns
              </p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary rounded-lg px-4 py-2 flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Campaign
            </button>
          </div>

          {/* Campaign Creation Form */}
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <CampaignBreadcrumbs 
                currentStep={currentStep}
                onStepClick={handleStepClick}
                isStepValid={isStepValid}
              />

              <form onSubmit={handleSubmit} className="space-y-8">
                {currentStep === 'details' ? (
                  <div className="space-y-6">
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Job Title</label>
                        <input
                          type="text"
                          value={formData.jobTitle}
                          onChange={(e) => setFormData(prev => ({ ...prev, jobTitle: e.target.value }))}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#6956A8] focus:ring-[#6956A8]"
                          placeholder="e.g., Software Engineer"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Industry</label>
                        <select
                          value={formData.industry}
                          onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#6956A8] focus:ring-[#6956A8]"
                        >
                          <option value="">Select Industry</option>
                          <option value="technology">Technology</option>
                          <option value="healthcare">Healthcare</option>
                          <option value="finance">Finance</option>
                          <option value="education">Education</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Job Type</label>
                        <select
                          value={formData.jobType}
                          onChange={(e) => setFormData(prev => ({ ...prev, jobType: e.target.value }))}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#6956A8] focus:ring-[#6956A8]"
                        >
                          <option value="">Select Job Type</option>
                          <option value="full-time">Full-time</option>
                          <option value="part-time">Part-time</option>
                          <option value="contract">Contract</option>
                          <option value="apprenticeship">Apprenticeship</option>
                          <option value="internship">Internship</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#6956A8] focus:ring-[#6956A8]"
                          placeholder="e.g., Remote, New York, London"
                        />
                      </div>
                    </div>

                    {/* Company Blacklist */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Blacklist
                      </label>
                      <CompanySearch
                        onSelect={handleCompanySelect}
                        onRemove={handleCompanyRemove}
                        selectedCompanies={formData.blacklistedCompanies}
                        placeholder="Search companies to exclude..."
                      />
                    </div>

                    {/* Credit Allocation */}
                    <CreditAllocation
                      availableCredits={500} // This would come from user's data
                      onChange={handleCreditAllocation}
                    />

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Campaign Description
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        rows={4}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#6956A8] focus:ring-[#6956A8]"
                        placeholder="Describe what you're looking for in this campaign..."
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleStepClick('template')}
                        disabled={!validateForm()}
                        className="btn-primary rounded-lg px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next: Email Template
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <CoverLetterGenerator
                      formData={formData}
                      onSelect={handleTemplateSelect}
                    />
                    <div className="flex justify-between mt-6">
                      <button
                        type="button"
                        onClick={() => setCurrentStep('details')}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Back to Details
                      </button>
                      <button
                        type="submit"
                        disabled={!selectedTemplate}
                        className="btn-primary rounded-lg px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Create Campaign
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </motion.div>
          )}

          {/* Empty State */}
          {!showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <h3 className="mt-2 text-sm font-semibold text-gray-900">No campaigns</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new campaign
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setShowForm(true)}
                  className="btn-primary rounded-lg px-4 py-2 flex items-center mx-auto"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  New Campaign
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AuthLayout>
  );
}