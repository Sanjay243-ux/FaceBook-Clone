import React from 'react';
import './ValidationCard.css';

export default function ValidationCard({ title = 'Requirements', criteria, isVisible, placement = 'bottom' }) {
  if (!isVisible) return null;

  return (
    <div className={`validation-card validation-card-${placement}`}>
      <div className="validation-card-header">
        <h6>{title}</h6>
      </div>
      <div className="validation-card-body">
        <ul className="validation-criteria-list">
          {criteria.map((item) => {
            const isMet = item.met;
            return (
              <li key={item.id} className={`validation-criterion ${isMet ? 'met' : 'unmet'}`}>
                <span className="validation-icon">
                  {isMet ? (
                    <i className="bi bi-check-circle-fill"></i>
                  ) : (
                    <i className="bi bi-x-circle-fill"></i>
                  )}
                </span>
                <span className="validation-text">{item.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="validation-arrow"></div>
    </div>
  );
}
