<script>
</script>

<header>
	<div class="logo-wrapper">
		<div class="logo-icon" />
		<div class="logo-text">
			<span>HYPER HOUSE</span>
			<span>Inmobiliaria</span>
		</div>
	</div>
	<div class="notification">
		<i class="far fa-bell" />
		<span class="dot" />
	</div>
</header>

<style>
	header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16px 24px;
		background: var(--white);
		border-bottom: 1px solid var(--border-color);
		z-index: 100;
	}

	.logo-wrapper {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.logo-icon {
		width: 38px;
		height: 38px;
		border: 2px solid var(--logo-green);
		border-radius: 8px;
		position: relative;
	}

	.logo-icon::before {
		content: '';
		position: absolute;
		top: 0;
		left: 12px;
		width: 2px;
		height: 100%;
		background: var(--logo-green);
	}

	.logo-icon::after {
		content: '';
		position: absolute;
		top: 16px;
		left: 0;
		width: 100%;
		height: 2px;
		background: var(--logo-green);
	}

	.logo-text {
		display: flex;
		flex-direction: column;
	}

	.logo-text span:first-child {
		color: var(--text-blue);
		font-weight: 700;
		font-size: 15px;
		letter-spacing: -0.3px;
		line-height: 1.1;
	}

	.logo-text span:last-child {
		color: var(--text-gray);
		font-size: 11px;
	}

	.notification {
		position: relative;
		color: var(--text-main);
		font-size: 20px;
		cursor: pointer;
		transition: 0.2s;
	}

	.notification:hover {
		color: var(--text-blue);
	}

	.notification .dot {
		position: absolute;
		top: 0;
		right: 0;
		width: 6px;
		height: 6px;
		background: var(--notification-red);
		border-radius: 50%;
		border: 1px solid var(--white);
	}

	/* Responsive */
	@media (min-width: 768px) {
		header {
			padding: 28px 32px;
		}

		.logo-icon {
			width: 42px;
			height: 42px;
		}

		.logo-text span:first-child {
			font-size: 16px;
		}
	}

	@media (min-width: 1024px) {
		header {
			padding: 32px 40px;
		}

		.logo-wrapper {
			gap: 16px;
		}
	}
</style>
