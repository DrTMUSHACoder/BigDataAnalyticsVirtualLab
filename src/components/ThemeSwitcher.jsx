import React, { useState, useEffect } from 'react';
import './ThemeSwitcher.css';

const themes = [
    { name: 'default', color: '#0ea5e9', label: 'Slate' },
    { name: 'forest', color: '#10b981', label: 'Forest' },
    { name: 'midnight', color: '#818cf8', label: 'Midnight' },
    { name: 'sepia', color: '#d97706', label: 'Sepia' },
    { name: 'nord', color: '#88c0d0', label: 'Nord' },
    { name: 'snow', color: '#ffffff', label: 'Snow' }
];

const ThemeSwitcher = () => {
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('preferred-theme') || 'snow');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('preferred-theme', currentTheme);
    }, [currentTheme]);

    return (
        <div className="theme-switcher-container">
            <span className="theme-label">Colour Themes:</span>
            <div className="theme-options">
                {themes.map((theme) => (
                    <button
                        key={theme.name}
                        className={`theme-dot ${currentTheme === theme.name ? 'active' : ''}`}
                        style={{ backgroundColor: theme.color }}
                        onClick={() => setCurrentTheme(theme.name)}
                        title={theme.label}
                    />
                ))}
            </div>
        </div>
    );
};

export default ThemeSwitcher;
