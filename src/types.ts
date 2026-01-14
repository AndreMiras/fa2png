import type { ReactNode } from 'react';

export interface IconProperties {
  icon: string;
  color: string;
  size: number;
}

export type ChangeHandler<T> = (value: T) => void;

export interface ConfigureIconProps {
  onIconChange: ChangeHandler<string>;
  iconValue: string;
  onColorChange: ChangeHandler<string>;
  colorValue: string;
  onSizeChange: ChangeHandler<number>;
  sizeValue: number;
}

export interface IconPreviewProps {
  icon: string;
  color: string;
  size: number;
}

export interface CustomInputProps {
  onChange: ChangeHandler<string>;
  prepend: ReactNode;
  value: string;
  append?: ReactNode;
  appendText?: ReactNode;
}

export interface InputComponentProps {
  onChange: ChangeHandler<string>;
  value: string;
}

export interface SizeInputProps {
  onChange: ChangeHandler<number>;
  value: number;
}
