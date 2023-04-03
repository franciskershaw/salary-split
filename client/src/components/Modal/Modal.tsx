import { FC, ReactNode, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import './_modal.scss';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title?: string;
  children?: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, setIsOpen, children, title }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('mousedown', handleClickOutside);
      return () => {
        window.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="modal">
        <div className="modal__content" ref={modalRef}>
          <div
            className={`modal__content--header ${
              title ? 'title-included' : 'justify-end'
            }`}>
            {title && <h1>{title}</h1>}
            <button onClick={() => setIsOpen(false)}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          </div>
          <div className="modal__content--body">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
