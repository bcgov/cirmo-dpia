<template>
	<div class="search_box">
	<div>
		This component is located at  <code> app/public/pid/vue/searchpid.vue</code>
	</div>
	<p>
		Use these results to narrow down results.
	</p>
	<form>
	<div class="row">
	  <div class="col-auto" style="width:50%;">
	    <label for="exampleInputEmail1" class="form-label">Keyword/s</label>
	    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
	    <div id="emailHelp" style="display:none;" class="form-text">Enter specific keywords that will help search through the PIA's</div>
	  </div>
	  <div class="col-auto" style="width:25%;">
	    <label for="exampleInputEmail1" class="form-label">Ministry</label>
	    <select class="form-select" aria-label="Default select example">
		<option>All ---</option>
		<option>PI</option>
		<option>Non PI</option>
	    </select>
	  </div>
	  <div class="col-auto">
	    <label for="exampleInputEmail1" class="form-label">Type</label>
	    <select class="form-select" aria-label="Default select example">
		<option>All ---</option>
		<option>ISA</option>
		<option>PIA</option>
	    </select>
	  </div>
	  <div class="col-auto">
	    <label for="exampleInputEmail1" class="form-label">PI and Non PI</label>
	    <select class="form-select" aria-label="Default select example">
		<option>All ---</option>
		<option>PI</option>
		<option>Non PI</option>
	    </select>
	  </div>
	</div>
	<div class="row form_spacer">
	  <div class="col-auto">
		<div class="row">
			  <div class="col-auto">
			    <label for="exampleInputEmail1" class="form-label">Time Range</label>
			    <input type="date" class="form-control" id="exampleInputEmail1" placeholder="From" aria-describedby="emailHelp">
			  </div>
			  <div class="col-auto">
			    <label for="exampleInputEmail1" class="form-label" style="visibility:hidden;">-</label>
			    <input type="date" class="form-control" id="exampleInputEmail1" placeholder="From" aria-describedby="emailHelp">
			  </div>
		  </div>
	  </div>
	  <div class="col-auto">
		<div class="row">
			  <div class="col-auto">
				    <label for="exampleInputEmail1" class="form-label" style="visibility:hidden;">-</label>
				  <button type="submit" class="btn btn-primary">Search</button>
			  </div>
			  <div class="col-auto">
				    <label for="exampleInputEmail1" class="form-label" style="visibility:hidden;">-</label>
				  <button type="submit" class="btn btn-primary reset">Reset</button>
			  </div>
		  </div>
               </div>
	</div>
</form>
</div>
</template>
