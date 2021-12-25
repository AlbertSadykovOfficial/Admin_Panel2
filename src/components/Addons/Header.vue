<template>
	<header class="header">
		<span class="header__items">
			<button
				class="header__link"
				:class="{'header__link-underline': statement.getPage() === 'group'}"
				@click="statement.setPage('group')">
				Group
			</button>
			<button
				class="header__link"
				:class="{'header__link-underline': statement.getPage() === 'position'}"
				@click="statement.setPage('position')">
				Position
			</button>
		</span>
	</header>
</template>
<script>
export default {
	props: ['statement']
}
</script>

<style src="@/assets/styles/header/header__link.css" scoped></style>
