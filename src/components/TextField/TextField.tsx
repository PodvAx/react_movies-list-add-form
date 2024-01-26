import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChange?: (newValue: string) => void,
  hasValidationIssues?: (value: string) => boolean,
};

function getRandomDigits() {
  return Math.random()
    .toFixed(16)
    .slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChange = () => {},
  hasValidationIssues = () => false,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setTouched] = useState(false);
  const [validated, setValidated] = useState(false);
  const hasError = touched && required && !value;
  const hasValidationIssue = validated && hasValidationIssues(value);

  const handleBlur = () => {
    setTouched(true);
    if (value) {
      setValidated(true);
    }
  };

  const handleChange = (newValue: string) => {
    onChange(newValue);
    if (!newValue) {
      setValidated(false);
    }
  };

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          type="text"
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError || hasValidationIssue,
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => handleChange(event.target.value)}
          onBlur={handleBlur}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}

      {hasValidationIssue && (
        <p className="help is-danger">{`${label} is not valid`}</p>
      )}
    </div>
  );
};
