import React, { useState } from 'react';
import { Settings as SettingsType } from '../types';
import { useToast } from '../hooks/useToast';

const Settings: React.FC = () => {
    const [settings, setSettings] = useState<SettingsType>({
        apiKey: 'shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        apiSecret: 'shpss_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    });
    const { showToast } = useToast();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would save this to a backend or local storage.
        console.log('Saving settings:', settings);
        showToast('تم حفظ الإعدادات بنجاح!', 'success');
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
                <h3 className="text-2xl font-semibold text-white mb-2">إعدادات النظام</h3>
                <p className="text-gray-400 mb-8">إدارة إعدادات الربط والتكامل مع الأنظمة الخارجية.</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Shopify Integration Section */}
                    <div>
                        <h4 className="text-lg font-bold text-[#ff4da6] mb-4 border-b border-gray-700 pb-2">الربط مع Shopify</h4>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="apiKey" className="block mb-2 text-sm font-medium text-gray-300">Shopify API Key</label>
                                <input 
                                    type="text" 
                                    name="apiKey" 
                                    id="apiKey" 
                                    value={settings.apiKey}
                                    onChange={handleInputChange}
                                    className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-[#ff4da6] focus:border-[#ff4da6] block w-full p-2.5 font-mono" 
                                />
                            </div>
                            <div>
                                <label htmlFor="apiSecret" className="block mb-2 text-sm font-medium text-gray-300">Shopify API Secret Key</label>
                                <input 
                                    type="password" 
                                    name="apiSecret" 
                                    id="apiSecret"
                                    value={settings.apiSecret}
                                    onChange={handleInputChange}
                                    className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-[#ff4da6] focus:border-[#ff4da6] block w-full p-2.5 font-mono" 
                                />
                            </div>
                             <div className="flex items-center p-4 text-sm text-blue-300 bg-blue-500/20 rounded-lg border border-blue-400/30" role="alert">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                                <span>هذه البيانات وهمية لأغراض العرض التوضيحي. في النظام الحقيقي، سيتم تشفيرها وتخزينها بأمان.</span>
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="pt-6 border-t border-gray-700">
                        <button 
                            type="submit" 
                            className="px-6 py-3 text-sm font-medium text-white bg-[#ff4da6] rounded-lg hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-pink-300 transition-all duration-300 glow-shadow">
                            حفظ الإعدادات
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Settings;
