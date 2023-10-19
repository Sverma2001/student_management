<template>
    <footer class="footer">
      <div class="footer-content">
        <p>&copy; {{ currentYear }} Argusoft private ltd. All Rights Reserved</p>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentYear: new Date().getFullYear(),
      };
    },
  };
  </script>
  
  <style scoped>
  .footer {
    background-color: black;
    color: #fff;
    text-align: center;
    padding: 15px;
    font-weight: bold;
    bottom: 0;
    position: fixed;
    width: 100%;
  }
  
  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .footer p {
    margin: 0;
    font-size: 14px;
  }
  </style>