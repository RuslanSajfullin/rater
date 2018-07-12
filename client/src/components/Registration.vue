<template>

  <div id="authorization" class="authorization">
    <div class="social">
      Social networks
      <div class="social-icons">
          <a href="#" target="_blank"><i class="fa fa-twitter-square fa-2x" aria-hidden="true"></i></a>
          <a href="#" target="_blank"><i class="fa fa-instagram fa-2x"></i></a>
          <a href="#" target="_blank"><i class="fa fa-facebook-square fa-2x"></i></a>
          <a href="#" target="_blank"><i class="fa fa-linkedin-square fa-2x"></i></a>
      </div>
    </div>
    <div id="login" class="form">
      <form>
        <div class="group">
          <input type="text" v-model="username"><span class="highlight"></span><span class="bar"></span>
          <label>Username</label>
        </div>
        <div class="group">
          <input type="password" v-model="password" v-on:input="valid11"><span class="highlight"></span><span class="bar"></span>
          <label>Password</label>
		  <div v-show="submitted">{{ message }}</div>  
        </div>
        <div class="group">
          <input v-model="repassword" v-on:input="valid11"><span class="highlight"></span><span class="bar"></span>
          <label>Password confirm</label>
		  <div v-show="submitted2">{{ messagerepassword }}</div> 
        </div>
        <div class="group">
        </div>
        <button type="button" class="button buttonBlue" @click="addUser">Register
          <div class="ripples buttonRipples"><span class="ripplesCircle"></span></div>
        </button>
      </form>
      <router-link v-bind:to="'/authorization'">I have account</router-link>
    </div>
    <div class="sign-in">
    </div>
  </div>
</template>

<script>
    import UserService from '@/services/UserService'
    export default {
      name: 'Registration',
      data () {
        return {
          username: '',
          password: '',
		  repassword: '',
		  submitted: false,
		  submitted2: false,
		  
        }
      },
      methods: {
        async addUser () {
          await UserService.addUser({
            username: this.username,
            password: this.password
          })
          this.$router.push({ name: 'Posts' })
        },
		async valid11  () { 
		       var password = this.password,
	   repassword = this.repassword,
	   message = 'Пароль должен содержать ',
	   messagerepassword;
	   
	   this.submitted=false; 

       if (password.length < 6 ) {
          message += 'более 6 символов ';
		
		 if (password === '') {
			 message += 'более 6 символов ';
		 }
		  this.submitted=true; 
	   }
	  
       if ( password.length > 25) {
          message += 'более 25 символов';
		  this.submitted=true; 
       }
	   
	   if (password.replace(/\D+/g,"") === "") 
       {
	      message += ', цифры ';
		  this.submitted=true; 
	   }
	   
	   if (password.match(/[A-Z]/g) + password.match(/[А-Я]/g) == 0 ) 
       {
	      message += ', заглавные';
		  this.submitted=true; 
	   }
	   
	   if (password.match(/[a-z]/g) + password.match(/[a-я]/g) == 0 ) 
       {
	      message += ', строчные' ;
		  this.submitted=true; 
	   }
   
       if (repassword != '') {      
         if (password !== repassword) {
             messagerepassword = 'Пароли не совпадают';
	        this.submitted2=true; 
         }
       }
       this.message = message;
       this.messagerepassword = messagerepassword;
       }
		
      }
    }
</script>

<style scoped>
  @import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css);
  .authorization { display: flex;}
  .social {
    text-align:center;
    width: 33%;
    order: 1;
  }
  .social a{
    text-align:center;
    background:#fff;
    margin:0 10px 10px 0;
    padding:6px;
    color:#000;
  }
  .social-icons {
    margin-top: 20px;
    text-align: center;
  }
  .form {
    width: 33%;
    order: 2;
  }
  .sign-in {
    width: 33%;
    order: 3;
  }
  * { box-sizing:border-box; }

  body {
    font-family: Helvetica;
    background: #eee;
    -webkit-font-smoothing: antialiased;
  }

  hgroup {
    text-align:center;
    margin-top: 4em;
  }

  h1, h3 { font-weight: 300; }

  h1 { color: #636363; }

  h3 { color: #4a89dc; }

  form {
    width: 380px;
    margin: auto;
    padding: 3em 2em 2em 2em;
  }

  .group {
    position: relative;
    margin-bottom: 45px;
  }

  input {
    font-size: 18px;
    padding: 10px 10px 10px 5px;
    -webkit-appearance: none;
    display: block;
    color: #636363;
    width: 100%;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #757575;
  }

  input:focus { outline: none; }


  /* Label */

  label {
    color: #999;
    font-size: 18px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    transition: all 0.2s ease;
  }


  /* active */

  input:focus ~ label, input.used ~ label {
    top: -20px;
    -webkit-transform: scale(.75);
    transform: scale(.75); left: -2px;
    /* font-size: 14px; */
    color: #4a89dc;
  }


  /* Underline */

  .bar {
    position: relative;
    display: block;
    width: 100%;
  }

  .bar:before, .bar:after {
    content: '';
    height: 2px;
    width: 0;
    bottom: 1px;
    position: absolute;
    background: #4a89dc;
    transition: all 0.2s ease;
  }

  .bar:before { left: 50%; }

  .bar:after { right: 50%; }


  /* active */

  input:focus ~ .bar:before, input:focus ~ .bar:after { width: 50%; }


  /* Highlight */

  .highlight {
    position: absolute;
    height: 60%;
    width: 100px;
    top: 25%;
    left: 0;
    pointer-events: none;
    opacity: 0.5;
  }


  /* active */

  input:focus ~ .highlight {
    -webkit-animation: inputHighlighter 0.3s ease;
    animation: inputHighlighter 0.3s ease;
  }


  /* Animations */

  @-webkit-keyframes inputHighlighter {
    from { background: #4a89dc; }
    to 	{ width: 0; background: transparent; }
  }

  @keyframes inputHighlighter {
    from { background: #4a89dc; }
    to 	{ width: 0; background: transparent; }
  }


  /* Button */

  .button {
    position: relative;
    display: inline-block;
    padding: 12px 24px;
    margin: .3em 0 1em 0;
    width: 100%;
    vertical-align: middle;
    color: #fff;
    font-size: 16px;
    line-height: 20px;
    -webkit-font-smoothing: antialiased;
    text-align: center;
    letter-spacing: 1px;
    background: transparent;
    border: 0;
    border-bottom: 2px solid #3160B6;
    cursor: pointer;
    transition: all 0.15s ease;
  }
  .button:focus { outline: 0; }


  /* Button modifiers */

  .buttonBlue {
    background: #4a89dc;
    text-shadow: 1px 1px 0 rgba(39, 110, 204, .5);
  }

  .buttonBlue:hover { background: #357bd8; }


  /* Ripples container */

  .ripples {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: transparent;
  }


  /* Ripples circle */

  .ripplesCircle {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    opacity: 0;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.25);
  }

  .ripples.is-active .ripplesCircle {
    -webkit-animation: ripples .4s ease-in;
    animation: ripples .4s ease-in;
  }


  /* Ripples animation */

  @-webkit-keyframes ripples {
    0% { opacity: 0; }

    25% { opacity: 1; }

    100% {
      width: 200%;
      padding-bottom: 200%;
      opacity: 0;
    }
  }

  @keyframes ripples {
    0% { opacity: 0; }

    25% { opacity: 1; }

    100% {
      width: 200%;
      padding-bottom: 200%;
      opacity: 0;
    }
  }

  footer { text-align: center; }

  footer p {
    color: #888;
    font-size: 13px;
    letter-spacing: .4px;
  }

  footer a {
    color: #4a89dc;
    text-decoration: none;
    transition: all .2s ease;
  }

  footer a:hover {
    color: #666;
    text-decoration: underline;
  }

  footer img {
    width: 80px;
    transition: all .2s ease;
  }

  footer img:hover { opacity: .83; }

  footer img:focus , footer a:focus { outline: none; }

</style>
