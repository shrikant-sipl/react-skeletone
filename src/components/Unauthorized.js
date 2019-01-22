import React, { Component } from 'react';

class Unauthorized extends Component {
  render() {
      return (
          <div>
              <h1>Unauthorized!</h1>
              <p>You are not authorize to access this page.</p>
          </div>
      )
  }
}

export default Unauthorized;
