import React, { useState } from 'react';

export type ComponentProps = {
  title: React.ReactElement;
  input: React.ReactElement;
  button: React.ReactElement;
  children?: React.ReactElement;
  className?: string;
};

const SearchComponent = ({
  title,
  input,
  button,
  children,
  ...rest
}: ComponentProps) => {
  return (
    <>
      <section {...rest} >
        {title}
        {input}
        {button}
        {children}
      </section>
    </>
  );
}

export { SearchComponent };