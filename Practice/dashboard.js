document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('name').innerText = 'Admin'; 
 
    document.getElementById('dashboard').addEventListener('click', function() {
       document.getElementById('main-content').innerHTML = '<h2>Dashboard Content Here...</h2>';
    });
 
    document.getElementById('users').addEventListener('click', function() {
       window.location.href = 'users.html';
    });
 });
 function users() 
    {
         window.location.href = 'user.html';
    }
    function dashboard() 
    {
         window.location.href = 'dashboard.html';
    }
    function loginSession() 
    {
         window.location.href = 'usersession.html';
    }
    function login() 
    {
         window.location.href = 'login.html';
    }
