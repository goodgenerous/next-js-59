import React from "react";

const withAuth = (WrappedComponent) => {
  return function withAuth(props) {
    const isLogin = true;

    if (!isLogin) return <div> Anda belum login </div>;

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
