import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Loader from './components/Loader';
import RoadmapDisplay from './components/RoadmapDisplay';
import CareerCards from './components/CareerCards';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';
import RoadmapActions from './components/RoadmapActions';
import { BTECH_BRANCHES } from './constants';
import { generateRoadmapAndCareers } from './services/geminiService';
import type { GeneratedData } from './types';
import { ThemeProvider } from './contexts/ThemeContext';

const AppContent: React.FC = () => {
    const [selectedBranch, setSelectedBranch] = useState<string>('');
    const [goal, setGoal] = useState<string>('');
    const [generatedData, setGeneratedData] = useState<GeneratedData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateRoadmap = useCallback(async () => {
        if (!selectedBranch) {
            setError('Please select a branch to continue.');
            return;
        }
        if (!goal.trim()) {
            setError('Please specify your career goal.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setGeneratedData(null);
        try {
            const data = await generateRoadmapAndCareers(selectedBranch, goal);
            setGeneratedData(data);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [selectedBranch, goal]);

    return (
        <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)] font-sans selection:bg-[var(--color-selection-bg)] flex flex-col">
            <div className="fixed inset-0 -z-10 h-full w-full bg-[var(--color-bg)] bg-[linear-gradient(to_right,rgba(128,128,128,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.04)_1px,transparent_1px)] bg-[size:14px_24px]">
                 <div className="fixed left-0 top-0 h-1/2 w-1/2 bg-[radial-gradient(circle_farthest-side,var(--color-primary-light)/10%,transparent)]"></div>
                 <div className="fixed left-1/2 top-1/2 h-1/2 w-1/2 bg-[radial-gradient(circle_farthest-side,var(--color-secondary-light)/10%,transparent)] translate-x-1/2 -translate-y-1/2"></div>
            </div>

            <div className="flex-grow">
                <main className="max-w-7xl mx-auto pb-20">
                    <Header />
                    <div className="p-4 md:p-8">
                        <div className="text-center mt-8 md:mt-16">
                            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Design Your B.Tech Future</h2>
                            <p className="max-w-3xl mx-auto text-lg text-[var(--color-text-secondary)]">
                                Select your branch, specify your career goal, and let our AI generate a personalized roadmap to guide you from freshman year to your dream job.
                            </p>
                        </div>

                        <div className="mt-12 max-w-3xl mx-auto p-6 bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-2xl backdrop-blur-lg shadow-2xl shadow-[var(--color-shadow)]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="branch" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Select Your Branch</label>
                                    <select
                                        id="branch"
                                        value={selectedBranch}
                                        onChange={(e) => setSelectedBranch(e.target.value)}
                                        className={`w-full bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition appearance-none ${
                                            selectedBranch ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-muted)]'
                                        }`}
                                        style={{
                                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                            backgroundPosition: 'right 0.5rem center',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: '1.5em 1.5em',
                                            paddingRight: '2.5rem',
                                        }}
                                    >
                                        <option value="" disabled>Select Your Branch</option>
                                        {BTECH_BRANCHES.map(branch => <option key={branch} value={branch}>{branch}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="goal" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Your Goal</label>
                                    <input
                                        id="goal"
                                        type="text"
                                        value={goal}
                                        onChange={(e) => setGoal(e.target.value)}
                                        placeholder="e.g., Data Scientist, AI Engineer"
                                        className="w-full bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
                                    />
                                </div>
                            </div>
                            <button
                                onClick={handleGenerateRoadmap}
                                disabled={isLoading}
                                className="w-full mt-6 py-3 px-6 text-lg font-semibold text-white bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-lg shadow-lg shadow-[var(--color-primary)]/30 hover:shadow-[var(--color-primary)]/50 hover:from-[var(--color-primary-light)] hover:to-[var(--color-secondary-light)] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Crafting Your Path...' : 'Generate My Roadmap'}
                            </button>
                        </div>

                        {error && <div className="mt-8 text-center text-red-400 bg-red-500/20 p-4 rounded-lg max-w-3xl mx-auto">{error}</div>}
                        
                        {isLoading && <Loader />}
                        
                        {generatedData && (
                           <>
                                <div id="printable-area">
                                    <RoadmapDisplay roadmapData={generatedData.roadmap} />
                                    <CareerCards careerPaths={generatedData.careerPaths} />
                                </div>
                                <RoadmapActions generatedData={generatedData} branch={selectedBranch} goal={goal} />
                           </>
                        )}
                    </div>
                </main>
            </div>
            <Footer />
            <Chatbot />
        </div>
    );
};

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
};

export default App;