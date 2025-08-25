import React, { useState } from 'react';
import type { GeneratedData, YearData, CareerPath, TitledResourceGroup } from '../types';

// SVG Icons
const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;
const ShareIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" /></svg>;
const PdfIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const DocxIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--color-success-text)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>;
const CopyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
const SpinnerIcon = () => <div className="w-5 h-5 border-2 border-t-transparent border-[var(--color-text-primary)] rounded-full animate-spin"></div>;
const ErrorIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

// Social Icons
const EmailSocialIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/></svg>;
const WhatsAppIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.267.655 4.398 1.908 6.161l-1.317 4.816 4.905-1.295z"/></svg>;
const LinkedInIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>;
const TelegramIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.032 8.24c-.21.956-1.045 4.498-1.503 6.643-.542 2.52-1.09 2.982-1.815 3.033-.91.063-1.442-.42-2.24-1.022-1.135-.86-1.76-1.39-2.92-2.257-1.458-1.076-.51-1.672.2-2.613.09-.115.18-.23.27-.344.693-.86 1.385-1.72 1.95-3.04.14-.33.28-.66.42-.99.07-.15.1-.25.03-.4-.07-.15-.24-.12-.39-.08s-1.03.62-1.5.9c-1 .6-1.88 1.12-2.82 1.78-.94.66-1.85 1.3-2.73 1.9-.13.09-.27.17-.4.26-.5.33-1.04.68-1.58.98-.54.3-1.03.4-1.56.3-.53-.1-.95-.27-1.29-.44-.34-.17-.63-.38-.7-.61-.07-.23.1-.48.24-.69.2-.3.4-.6.6-.9.2-.3.4-.6.6-.9l.3-.4c.7-1 1.4-2 2.1-3 .7-.9 1.3-1.9 2-2.8.2-.3.4-.6.6-.8.3-.3.6-.5.9-.6.3-.1.6-.2.9-.2.3 0 .6.1.8.2.2.1.4.3.5.5s.1.4.1.6c0 .2-.1.4-.2.6l-.3.5c-1.4 2.5-2.8 5-4.2 7.5-.1.2-.2.4-.3.6s-.2.4-.2.6c0 .2.1.4.2.5s.2.2.3.2c.1 0 .2 0 .3-.1l.6-.4c.5-.3.9-.6 1.4-.9.5-.3 1-.6 1.5-.9.3-.2.6-.4.9-.6.2-.2.5-.3.7-.5.1-.1.2-.1.3-.2l.1-.1c.2-.1.3-.2.4-.3.1-.1.2-.2.3-.3.6-.5.9-1 1.2-1.5.3-.5.6-1 .9-1.5s.5-1 .8-1.5c.1-.2.2-.4.3-.6.1-.2.2-.4.3-.5.1 0 .2-.1.3-.1.1 0 .2 0 .3.1s.1.1.2.2c.1.1.1.2.1.3s0 .2-.1.3z"/></svg>;


interface RoadmapActionsProps {
  generatedData: GeneratedData;
  branch: string;
  goal: string;
}

const waitForLibraries = (timeout = 7000): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      const check = () => {
        if (typeof (window as any).jspdf !== 'undefined') {
          resolve(true);
        } else if (Date.now() - startTime > timeout) {
          reject(new Error('PDF library failed to load within the timeout period.'));
        } else {
          setTimeout(check, 100);
        }
      };
      check();
    });
  };

const getYearTitle = (year: number): string => {
    const titles = [
      'Foundations',
      'Core Skills',
      'Advanced Concepts',
      'Specialization & Projects'
    ];
    const yearLabel = year === 4 ? 'Final Year' : `Year ${year}`;
    const descriptiveTitle = titles[year - 1] || '';
    return `${yearLabel} – ${descriptiveTitle}`;
};

const generateRoadmapHtml = (data: GeneratedData, branch: string, goal: string): string => {
  const { roadmap, careerPaths } = data;
  
  const styles = `
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
      h1, h2, h3, h4, h5 { color: #0891b2; }
      h1 { font-size: 2em; text-align: center; }
      h2 { font-size: 1.75em; border-bottom: 2px solid #0891b2; padding-bottom: 5px; margin-top: 2em; }
      h3 { font-size: 1.5em; margin-top: 1.5em; }
      h4 { font-size: 1.2em; color: #db2777; margin-top: 1.5em; margin-bottom: 0.5em;}
      h5 { font-size: 1.1em; color: #111827; margin: 1em 0 0.5em 0; }
      a { color: #06b6d4; text-decoration: none; }
      a:hover { text-decoration: underline; }
      ul { padding-left: 0; list-style-type: none; }
      li { margin-bottom: 8px; }
      .year-section, .career-card { margin-bottom: 2em; border: 1px solid #eee; padding: 20px; border-radius: 8px; background-color: #fdfdfd; }
      .resource-card { border: 1px solid #e5e7eb; border-radius: 6px; padding: 10px; margin-bottom: 10px; }
      .tag { display: inline-block; background-color: #e0f7fa; color: #00796b; padding: 2px 8px; border-radius: 12px; font-size: 0.9em; margin-right: 5px; margin-bottom: 5px;}
      p { margin: 0.5em 0; }
    </style>
  `;

  const createLink = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
  
  const renderResourceGroup = (groups: TitledResourceGroup[]) => {
      if (!groups || groups.length === 0) return '<p>N/A</p>';
      return groups.map(group => `
        <div>
          <h5>${group.title}</h5>
          <ul>
            ${group.resources.map(res => `
              <li class="resource-card">
                <strong>${createLink(res.url, res.title)}</strong><br/>
                <small><em>Platform:</em> ${res.platform} | <em>Access:</em> ${res.access} | <em>Type:</em> ${res.type}</small><br/>
                <small>${res.notes}</small>
              </li>
            `).join('')}
          </ul>
        </div>
      `).join('');
  };

  const roadmapHtml = roadmap.map((yearData: YearData) => `
    <div class="year-section">
      <h3>${getYearTitle(yearData.year)}</h3>
      
      <h4>Core Subjects</h4>
      ${renderResourceGroup(yearData.coreSubjects)}
      
      <h4>Programming &amp; Tools</h4>
      ${renderResourceGroup(yearData.skills.programming)}
      ${renderResourceGroup(yearData.skills.software)}
      
      <h4>Soft Skills</h4>
      <p>${yearData.skills.softSkills.join(', ')}</p>
      
      <h4>Certifications</h4>
      ${renderResourceGroup(yearData.certifications)}
      
      <h4>Projects</h4>
      <ul>${yearData.projects.map(p => `<li><strong>${p.title}:</strong> ${p.description} ${p.githubLink ? `(${createLink(p.githubLink, 'GitHub')})` : ''}</li>`).join('')}</ul>
      
      <h4>Internships</h4>
      <p>${yearData.internships}</p>
      
      <h4>Placement Prep</h4>
       ${renderResourceGroup(yearData.placementPrep)}
    </div>
  `).join('');

  const careersHtml = careerPaths.map((career: CareerPath) => `
    <div class="career-card">
      <h3>${career.title}</h3>
      <p><strong>Average Salary:</strong> ${career.avgSalary}</p>
      <p>${career.description}</p>
      <div>${career.skills.map(s => `<span class="tag">${s}</span>`).join('')}</div>
      <h4>Project Idea</h4>
      <p>${career.projectIdea}</p>
    </div>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>B.Tech Roadmap: ${branch} - ${goal}</title>
      <!-- saved from url=(0014)about:internet -->
      ${styles}
    </head>
    <body>
      <h1>B.Tech Roadmap for ${branch}</h1>
      <h2 style="text-align: center; border: none;">Goal: ${goal}</h2>
      ${roadmapHtml}
      <h2>Potential Career Paths</h2>
      ${careersHtml}
    </body>
    </html>
  `;
};


const RoadmapActions: React.FC<RoadmapActionsProps> = ({ generatedData, branch, goal }) => {
  const [isDownloadMenuOpen, setDownloadMenuOpen] = useState(false);
  const [isShareMenuOpen, setShareMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pdfStatus, setPdfStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [docStatus, setDocStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  const handlePdfDownload = async () => {
    if (pdfStatus === 'loading') return;
    setPdfStatus('loading');
    
    try {
        await waitForLibraries();
        const { jsPDF } = (window as any).jspdf;
        const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });

        let y = 15; // vertical cursor
        const pageHeight = doc.internal.pageSize.getHeight();
        const leftMargin = 15;
        const lineWidth = doc.internal.pageSize.getWidth() - leftMargin * 2;

        const checkPageBreak = (spaceNeeded = 10) => {
            if (y + spaceNeeded > pageHeight - 15) { // 15mm bottom margin
                doc.addPage();
                y = 15;
            }
        };

        // --- TITLE PAGE ---
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        doc.text('B.Tech Roadmap', doc.internal.pageSize.getWidth() / 2, y, { align: 'center' });
        y += 10;
        
        doc.setFontSize(16);
        doc.setFont('helvetica', 'normal');
        doc.text(`Branch: ${branch}`, doc.internal.pageSize.getWidth() / 2, y, { align: 'center' });
        y += 8;
        doc.text(`Career Goal: ${goal}`, doc.internal.pageSize.getWidth() / 2, y, { align: 'center' });
        
        // --- ROADMAP SECTIONS ---
        generatedData.roadmap.forEach((yearData) => {
            doc.addPage();
            y = 15;

            // Year Title
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text(getYearTitle(yearData.year), leftMargin, y);
            y += 10;
            
            const renderGroup = (title: string, groups: TitledResourceGroup[]) => {
                if (!groups || groups.length === 0) return;
                checkPageBreak(15);
                doc.setFontSize(14);
                doc.setFont('helvetica', 'bold');
                doc.text(title, leftMargin, y);
                y += 7;
                
                groups.forEach(group => {
                    checkPageBreak(8);
                    doc.setFontSize(12);
                    doc.setFont('helvetica', 'italic');
                    doc.text(group.title, leftMargin + 5, y);
                    y += 6;
                    
                    group.resources.forEach(res => {
                        checkPageBreak(12);
                        doc.setFontSize(10);
                        doc.setFont('helvetica', 'bold');
                        doc.setTextColor(6, 182, 212); // Primary color
                        doc.textWithLink(res.title, leftMargin + 10, y, { url: res.url });
                        doc.setTextColor(51, 51, 51); // Reset color
                        
                        doc.setFont('helvetica', 'normal');
                        const details = `${res.platform} | ${res.access} | ${res.type}`;
                        doc.text(details, leftMargin + 10, y + 4);
                        
                        const notesLines = doc.splitTextToSize(res.notes, lineWidth - 15);
                        doc.text(notesLines, leftMargin + 10, y + 8);
                        
                        y += 8 + (notesLines.length * 3.5);
                    });
                     y += 2;
                });
                y += 5;
            };

            renderGroup('📚 Core Subjects', yearData.coreSubjects);
            renderGroup('💻 Programming', yearData.skills.programming);
            renderGroup('🛠️ Software & Tools', yearData.skills.software);
            renderGroup('📜 Certifications', yearData.certifications);

            // --- Simple Sections ---
            const renderSimpleSection = (title: string, content: string | string[]) => {
                 if(!content || content.length === 0) return;
                 checkPageBreak(15);
                 doc.setFontSize(14);
                 doc.setFont('helvetica', 'bold');
                 doc.text(title, leftMargin, y);
                 y += 6;
                 doc.setFontSize(10);
                 doc.setFont('helvetica', 'normal');
                 const text = Array.isArray(content) ? content.join(', ') : content;
                 const lines = doc.splitTextToSize(text, lineWidth - 5);
                 doc.text(lines, leftMargin + 5, y);
                 y += (lines.length * 5) + 5;
            };
            
            renderSimpleSection('🗣️ Soft Skills', yearData.skills.softSkills);
            
            // --- Projects Section ---
            if(yearData.projects && yearData.projects.length > 0) {
                checkPageBreak(15);
                doc.setFontSize(14);
                doc.setFont('helvetica', 'bold');
                doc.text('⚡ Project Ideas', leftMargin, y);
                y += 6;
                yearData.projects.forEach(p => {
                    checkPageBreak(12);
                    doc.setFontSize(11);
                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor(219, 39, 119); // Secondary color
                    doc.textWithLink(p.title, leftMargin + 5, y, { url: p.githubLink });
                    doc.setTextColor(51, 51, 51);
                    y += 5;

                    doc.setFontSize(10);
                    doc.setFont('helvetica', 'normal');
                    const descLines = doc.splitTextToSize(p.description, lineWidth - 10);
                    doc.text(descLines, leftMargin + 10, y);
                    y += (descLines.length * 5) + 3;
                });
                y += 5;
            }
            
            renderSimpleSection('🏢 Internships', yearData.internships);
            renderGroup('🎯 Placement Prep', yearData.placementPrep);
        });

        // --- CAREER PATHS ---
        doc.addPage();
        y = 15;
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text('Potential Career Paths', doc.internal.pageSize.getWidth() / 2, y, { align: 'center' });
        y += 12;

        generatedData.careerPaths.forEach(career => {
          checkPageBreak(40);
          doc.setFontSize(14);
          doc.setFont('helvetica', 'bold');
          doc.text(career.title, leftMargin, y);
          y+=6;
          doc.setFontSize(11);
          doc.setFont('helvetica', 'italic');
          doc.text(career.avgSalary, leftMargin, y);
          y+=6;

          doc.setFontSize(10);
          doc.setFont('helvetica', 'normal');
          const descLines = doc.splitTextToSize(career.description, lineWidth);
          doc.text(descLines, leftMargin, y);
          y += descLines.length * 5 + 4;
          
          doc.setFont('helvetica', 'bold');
          doc.text('Key Skills:', leftMargin, y);
          y+=5;
          doc.setFont('helvetica', 'normal');
          const skillsText = doc.splitTextToSize(career.skills.join(', '), lineWidth - 5);
          doc.text(skillsText, leftMargin + 5, y);
          y += skillsText.length * 5 + 4;

          doc.setFont('helvetica', 'bold');
          doc.text('Project Idea:', leftMargin, y);
          y+=5;
          doc.setFont('helvetica', 'normal');
          const ideaLines = doc.splitTextToSize(career.projectIdea, lineWidth - 5);
          doc.text(ideaLines, leftMargin + 5, y);
          y += ideaLines.length * 5 + 8;
        });

        const safeBranch = branch.replace(/[\s,()]/g, '_');
        const safeGoal = goal.replace(/[\s,()]/g, '_');
        const filename = `Roadmap_${safeBranch}_${safeGoal}.pdf`;
        doc.save(filename);

        setPdfStatus('success');
        setTimeout(() => {
            setPdfStatus('idle');
            setDownloadMenuOpen(false);
        }, 3000);
    } catch (error) {
        console.error('PDF generation failed:', error);
        setPdfStatus('error');
        setTimeout(() => setPdfStatus('idle'), 3000);
    }
  };

  const handleDocxDownload = () => {
    if (docStatus !== 'idle') return;
    setDocStatus('loading');

    try {
        const htmlContent = generateRoadmapHtml(generatedData, branch, goal);
        const blob = new Blob(['\ufeff', htmlContent], {
            type: 'application/msword'
        });
        
        const safeBranch = branch.replace(/[\s,()]/g, '_');
        const safeGoal = goal.replace(/[\s,()]/g, '_');
        const filename = `Roadmap_${safeBranch}_${safeGoal}.doc`;

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        setDocStatus('success');
    } catch (error) {
        console.error("DOCX generation failed:", error);
        setDocStatus('error');
    } finally {
        setTimeout(() => {
            setDocStatus('idle');
            setDownloadMenuOpen(false);
        }, 3000);
    }
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShareMenuOpen(false);
      }, 2000);
    });
  };

  const getShareText = () => `Check out my B.Tech Roadmap for ${branch} with a goal of becoming a ${goal}! Generated by B.Tech Roadmap Hub.`;

  const handleShareSocial = (platform: 'email' | 'whatsapp' | 'linkedin' | 'telegram') => {
    const text = encodeURIComponent(getShareText());
    const url = encodeURIComponent(window.location.href);
    let shareUrl = '';

    switch(platform) {
        case 'email':
            const subject = `My B.Tech Roadmap: ${branch} - ${goal}`;
            shareUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${text}%0A%0A${url}`;
            window.location.href = shareUrl;
            break;
        case 'whatsapp':
            shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            break;
        case 'telegram':
            shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
            break;
    }
    if (platform !== 'email') {
        window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
    setShareMenuOpen(false);
  }

  const getButtonContent = (status: 'idle' | 'loading' | 'success' | 'error', idleIcon: React.ReactNode, idleText: string, loadingText = 'Preparing full roadmap...') => {
    switch (status) {
        case 'loading': return <><SpinnerIcon /> <span>{loadingText}</span></>;
        case 'success': return <><CheckIcon /> <span>Downloaded!</span></>;
        case 'error': return <><ErrorIcon /> <span>Failed</span></>;
        case 'idle':
        default: return <>{idleIcon} <span>{idleText}</span></>;
    }
  };

  return (
    <div id="roadmap-actions" className="mt-12 flex justify-center items-center gap-4">
      <div className="relative">
        <button
          onClick={() => setDownloadMenuOpen(!isDownloadMenuOpen)}
          className="flex items-center gap-2 px-6 py-3 font-semibold text-white bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-lg shadow-lg shadow-[var(--color-primary)]/30 hover:shadow-[var(--color-primary)]/50 hover:from-[var(--color-primary-light)] hover:to-[var(--color-secondary-light)] transition-all duration-300 transform hover:scale-105"
        >
          <DownloadIcon />
          Download
        </button>
        {isDownloadMenuOpen && (
          <div className="absolute bottom-full mb-2 w-60 bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-lg shadow-2xl p-2 z-20">
            <button onClick={handlePdfDownload} disabled={pdfStatus !== 'idle'} className="w-full flex items-center gap-3 p-2 text-left rounded-md text-[var(--color-text-primary)] hover:bg-[var(--color-input-bg)] disabled:opacity-50 transition-colors">
              {getButtonContent(pdfStatus, <PdfIcon />, 'Download as PDF')}
            </button>
            <button onClick={handleDocxDownload} disabled={docStatus !== 'idle'} className="w-full flex items-center gap-3 p-2 text-left rounded-md text-[var(--color-text-primary)] hover:bg-[var(--color-input-bg)] disabled:opacity-50 transition-colors">
              {getButtonContent(docStatus, <DocxIcon />, 'Download as Word (.doc)')}
            </button>
          </div>
        )}
      </div>

      <div className="relative">
        <button
          onClick={() => setShareMenuOpen(!isShareMenuOpen)}
          className="flex items-center gap-2 px-6 py-3 font-semibold bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg shadow-md hover:border-[var(--color-primary)] transition-colors transform hover:scale-105"
        >
          <ShareIcon />
          Share
        </button>
        {isShareMenuOpen && (
           <div className="absolute bottom-full mb-2 w-56 bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-lg shadow-2xl p-2 z-20">
              <button onClick={handleCopyLink} className="w-full flex items-center gap-3 p-2 text-left rounded-md text-[var(--color-text-primary)] hover:bg-[var(--color-input-bg)] transition-colors">
                  {copied ? <CheckIcon/> : <CopyIcon />} <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
               <button onClick={() => handleShareSocial('email')} className="w-full flex items-center gap-3 p-2 text-left rounded-md text-[var(--color-text-primary)] hover:bg-[var(--color-input-bg)] transition-colors"><EmailSocialIcon /><span>Share via Email</span></button>
               <button onClick={() => handleShareSocial('whatsapp')} className="w-full flex items-center gap-3 p-2 text-left rounded-md text-[var(--color-text-primary)] hover:bg-[var(--color-input-bg)] transition-colors"><WhatsAppIcon /><span>Share to WhatsApp</span></button>
               <button onClick={() => handleShareSocial('linkedin')} className="w-full flex items-center gap-3 p-2 text-left rounded-md text-[var(--color-text-primary)] hover:bg-[var(--color-input-bg)] transition-colors"><LinkedInIcon /><span>Share to LinkedIn</span></button>
               <button onClick={() => handleShareSocial('telegram')} className="w-full flex items-center gap-3 p-2 text-left rounded-md text-[var(--color-text-primary)] hover:bg-[var(--color-input-bg)] transition-colors"><TelegramIcon /><span>Share to Telegram</span></button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoadmapActions;