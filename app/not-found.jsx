'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'var(--bg-dark-solid)',
      padding: '40px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Background Elements */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(110, 68, 42, 0.05) 0%, transparent 70%)',
          zIndex: 0
        }}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(110, 68, 42, 0.05) 0%, transparent 70%)',
          zIndex: 0
        }}
      />

      <div style={{ zIndex: 1, position: 'relative' }}>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            fontSize: 'clamp(6rem, 15vw, 10rem)',
            fontFamily: 'var(--font-serif)',
            color: 'var(--primary-color)',
            lineHeight: '1',
            margin: '0',
            opacity: 0.9,
            textShadow: '4px 4px 10px rgba(0,0,0,0.05)'
          }}
        >
          404
        </motion.h1>
        
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '80px' }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          style={{
            height: '2px',
            backgroundColor: 'var(--primary-color)',
            margin: '20px auto',
            opacity: 0.5
          }}
        />

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            color: 'var(--text-main)',
            marginBottom: '16px',
            fontWeight: '600'
          }}
        >
          Door Not Found
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1.1rem',
            color: 'var(--text-muted)',
            maxWidth: '500px',
            margin: '0 auto 40px',
            lineHeight: '1.6'
          }}
        >
          It seems the page you are looking for has been moved, deleted, or never existed. Let's get you back to exploring our premium luxury collection.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
        >
          <Link href="/" passHref>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '16px 40px',
                fontSize: '1rem',
                fontFamily: 'var(--font-sans)',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                backgroundColor: 'var(--primary-color)',
                color: '#F8F4EE',
                border: '1px solid var(--primary-color)',
                borderRadius: '2px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease, color 0.3s ease',
                boxShadow: '0 10px 30px rgba(110, 68, 42, 0.15)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--primary-color)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--primary-color)';
                e.currentTarget.style.color = '#F8F4EE';
              }}
            >
              Return Home
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
