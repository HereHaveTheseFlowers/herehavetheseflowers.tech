import classnames from 'classnames';
import React from 'react';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input(props: InputProps) {
  const { className, onChange } = props;
  const classNames = classnames('input', className);
  return <input {...props} className={classNames} onChange={onChange} />;
}
