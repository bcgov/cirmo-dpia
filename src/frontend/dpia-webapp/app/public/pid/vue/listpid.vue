<!-- 
 *  This file defines the search filter box feature in DPIA. 
 *
 *   Filter by Ministry
 *       API called -  
 *       Function input and function output   
 *   
 *   Filter by Keyword
 *       API called -  
 *       Function input and function output   
 *   
 *   Filter by description
 *       API called -  
 *       Function input and function output   
 *   
 *   Filter by Date
 *       API called -  
 *       Function input and function output   
-->
<template>
	<div class="table_container">
		<div class="showing">
			<b>Showing</b> 10 of 100 results

		</div>
		<table class="table">
	  <thead class="table-dark">
	    <tr>
	      <th scope="col">#</th>
	      <th scope="col">First</th>
	      <th scope="col">Last</th>
	      <th scope="col">Handle</th>
	    </tr>
	  </thead>
	  <tbody>
	    <tr>
	      <th scope="row">1</th>
	      <td>Mark</td>
	      <td>Otto</td>
	      <td>@mdo</td>
	    </tr>
	    <tr>
	      <th scope="row">2</th>
	      <td>Jacob</td>
	      <td>Thornton</td>
	      <td>@fat</td>
	    </tr>
	    <tr>
	      <th scope="row">3</th>
	      <td>Larry</td>
	      <td>the Bird</td>
	      <td>@twitter</td>
	    </tr>
	  </tbody>
	</table>
    </div>
</template>
<script>
	export default {
		data() {
			return {
				pid:0,
			}
		},
		mounted: function() {
		/*	  $.ajax({
				    url: '/activity/head/52',
				    method: 'GET',
				    success: function(data) {
				      this.comments = data;
				    }
				  });
        */
		}
	}

</script>
