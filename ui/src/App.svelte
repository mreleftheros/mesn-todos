<script>
	import { Router, Route } from 'svelte-routing';
	import Private from './lib/Private.svelte';
	import Home from './pages/Home.svelte';
	import Login from './pages/Login.svelte';
	import Signup from './pages/Signup.svelte';
	import Auth from './lib/Auth.svelte';
	import Nav from './lib/Nav.svelte';
</script>

<Router>
	<Auth>
		<header class="header">
			<Nav />
		</header>
		<main class="main">
			<Route path='/'>
				<Private>
					<Home />
				</Private>
			</Route>
			<Route path='/login' component={Login} />
			<Route path='/signup' component={Signup} />
		</main>
		<footer class="footer">
			<p class="footer-text">Copyright &copy; Todos 2022</p>
		</footer>
	</Auth>
</Router>

<style>
	.header {
		background-color: crimson;
	}

	.footer {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #111;
		color: #ccd;
	}

	.footer-text {
		text-align: center;
		font-size: 1.5rem;
	}
</style>