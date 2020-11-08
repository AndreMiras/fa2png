import React from 'react';

const Nav = () => (
  <nav className="navbar navbar-inverse navbar-fixed-top">
    <div className="container">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <a className="navbar-brand" href={process.env.PUBLIC_URL}>FontAwesome to PNG</a>
      </div>
      <div id="navbar" className="navbar-collapse collapse">
        <ul className="nav navbar-nav">
          <li className="active"><a href="/">Home</a></li>
          <li><a href="https://github.com/AndreMiras/fa2png">About</a></li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Nav;
