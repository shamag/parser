/**
 * Created by and on 24.07.16.
 */
$(function(){
  let url = '/api/conv';
  $.ajax({
    dataType: "json",
    url: url,
   // data: data,
    success: success
  });
 function success(data ){
   let $table = $('.conversations-table');
   console.log($table);
   let header = $table.html();
   var rows='';
   data.map(function(obj){
     console.log(obj);
     rows +='<tr>';
     rows += `<td> ${obj.projectId} </td><td> ${obj.projectName} </td><td> ${obj.profile} </td><td> ${obj.link} </td>`;
     rows +=`<td> ${obj.updatedAt} </td><td> ${obj.notes} </td><td> ${obj.lastAnswer} </td>`;
     rows +='</tr>'
   });
   rows = header + rows;
   $table.html(rows);
 }
});
