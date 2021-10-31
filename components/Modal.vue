<template>
	<!-- Modal -->
	<div id="modal-detail" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 id="exampleModalLabel" class="modal-title">Detail Pokemon</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<ul v-if="state_pokemon" class="">
						<li class="m-2">
							<div class="flex-container">
								<img v-if="state_pokemon.sprites && state_pokemon.sprites.front_default" class="img-size img-custom" :src="state_pokemon.sprites.front_default" alt="" />
							</div>
							<div class="row">
								<div class="col-md">
									<span class="text-number">{{ state_pokemon.id }}</span>
								</div>
							</div>
							<div class="row mb-1">
								<div class="col-md">
									<span class="text-name">{{ state_pokemon.name }}</span>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
