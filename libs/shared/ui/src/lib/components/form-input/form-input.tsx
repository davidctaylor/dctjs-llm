import React, { ChangeEvent }  from 'react';

export interface FormInputProps {
  label?: string;
  name?: string;
  placeholder?: string; 
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const FormInput: React.FC<FormInputProps > = ({ value, label, name, placeholder, type, onChange }) => (
  <>
    {label && <label className="text-sm text-slate-600 capitalize" htmlFor="name">{label}</label>}
    <input
      type={type}
      value={value}
      name={name}
      className="h-[46px] border border-stone-400 pl-2 rounded-lg"
      placeholder={placeholder}
      onChange={(e) => onChange(e)}
    />
  </>
);
