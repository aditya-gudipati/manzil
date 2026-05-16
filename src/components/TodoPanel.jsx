import { useNavigate } from 'react-router-dom';
import { ClipboardList } from 'lucide-react';

const TodoPanel = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => navigate('/packing')}
        style={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'var(--primary-green)',
          boxShadow: '0 4px 24px rgba(45,106,79,0.5)',
          border: '1px solid rgba(255,255,255,0.25)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          zIndex: 1100,
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.1)';
          e.target.style.boxShadow = '0 8px 32px rgba(45,106,79,0.65)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 4px 24px rgba(45,106,79,0.5)';
        }}
      >
        <ClipboardList size={22} color="white" />
      </button>
    </>
  );
};

export default TodoPanel;