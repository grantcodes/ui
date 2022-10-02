import React from 'react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className: string
}

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className: string
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className: string
}

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className: string
}

export interface RadioProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className: string
}
