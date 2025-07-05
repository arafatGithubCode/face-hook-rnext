import React from "react";

const getChildId = (children) => {
  const child = React.Children.only(children);

  if ("id" in child.props) {
    return child.props.id;
  }
};

const Field = ({ label, children, error }) => {
  const id = getChildId(children);

  return (
    <div className="form-control">
      {label && (
        <label htmlFor={id} className="auth-label">
          {label}
        </label>
      )}
      {children}
      {!!error && (
        <div className="text-red-500" role="alert">
          {error.message}
        </div>
      )}
    </div>
  );
};

export default Field;
