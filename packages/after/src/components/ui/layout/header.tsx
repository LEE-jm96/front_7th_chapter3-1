import React, { useEffect, useState } from 'react';

const THEME_STORAGE_KEY = 'after-theme';

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored) {
    return stored === 'dark';
  }

  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
};

export const Header: React.FC = () => {
  const [isDark, setIsDark] = useState(getInitialTheme);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      window.localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    } else {
      root.classList.remove('dark');
      window.localStorage.setItem(THEME_STORAGE_KEY, 'light');
    }
  }, [isDark]);

  const palette = isDark
    ? {
        surface: '#0f172a',
        border: '#1e293b',
        shadow: '0 1px 6px rgba(15, 23, 42, 0.7)',
        heading: '#f8fafc',
        subheading: '#cbd5f5',
        badgeBg: '#2563eb',
        badgeFg: '#e2e8f0',
        accentSurface: '#1d2438',
        accentBorder: '#2f3b56',
        avatarBg: '#1e293b',
        avatarFg: '#fbbf24',
      }
    : {
        surface: '#ffffff',
        border: '#e5e7eb',
        shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        heading: '#1a202c',
        subheading: '#718096',
        badgeBg: '#007bff',
        badgeFg: '#ffffff',
        accentSurface: '#f8fafc',
        accentBorder: '#d7ddeb',
        avatarBg: '#e3f2fd',
        avatarFg: '#007bff',
      };

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <header
      style={{
        backgroundColor: palette.surface,
        borderBottom: `1px solid ${palette.border}`,
        boxShadow: palette.shadow,
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '64px',
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: palette.badgeBg,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: palette.badgeFg,
              fontWeight: 'bold',
              fontSize: '20px',
            }}
          >
            L
          </div>
          <div>
            <h1
              style={{
                fontSize: '18px',
                fontWeight: '700',
                color: palette.heading,
                margin: 0,
                lineHeight: 1,
              }}
            >
              Hanghae Company
            </h1>
            <p
              style={{
                fontSize: '11px',
                color: palette.subheading,
                margin: 0,
                lineHeight: 1,
                marginTop: '2px',
              }}
            >
              Design System Migration Project
            </p>
          </div>
        </div>

        {/* User Info */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <button
            type="button"
            onClick={toggleTheme}
            aria-pressed={isDark}
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              border: `1px solid ${palette.accentBorder}`,
              backgroundColor: palette.accentSurface,
              color: palette.heading,
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition:
                'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease',
            }}
          >
            {isDark ? '라이트 모드' : '다크 모드'}
          </button>

          <div
            style={{
              textAlign: 'right',
            }}
          >
            <div
              style={{
                fontSize: '14px',
                fontWeight: '600',
                color: palette.heading,
              }}
            >
              Demo User
            </div>
            <div
              style={{
                fontSize: '12px',
                color: palette.subheading,
              }}
            >
              demo@example.com
            </div>
          </div>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: palette.avatarBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: palette.avatarFg,
              fontWeight: '600',
              fontSize: '16px',
            }}
          >
            DU
          </div>
        </div>
      </div>
    </header>
  );
};

