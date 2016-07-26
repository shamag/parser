/**
 * Created by and on 24.07.16.
 */
$(function(){

  let $table = $('.conversations-table');
  $table.on('keyup','.notes-div input',function (e) {
    let id = $(e.target).closest('tr').attr('data-id');
    let note = $(e.target).val();
    console.log('val='+note,$(e.target));
    function setNote(data){
      console.log(data);
    }
    $.ajax({
      dataType: "json",
      type: "PUT",
      url: '/api/conv/'+id,
      data: {notes: note},
      success: setNote
    });
    console.log('change',id);
  });
  let url='';
  let isArc = $table.hasClass('table-all');
  if (isArc){
    url = '/api/conv/all';}
  else{
    url = '/api/conv';}
  $.ajax({
    dataType: "json",
    url: url,
   // data: data,
    success: success
  });
 function success(data ){

   let $table = $('.conversations-table');
   let header = $table.html();
   var rows='';
   data.map(function(obj){
     console.log(obj);
     let isArc = $('.conversations-table').hasClass('table-all');
     let link ='';
     let notesTd=`<td class="notes-div"> <input name="notes-${obj.projectId}" id="notes-${obj.projectId}" type="text" value="${obj.notes}"> </td>`;
     if(isArc){
       notesTd = `<td class="notes-div"> ${obj.notes} </td>`
     }
     let newAnswMessage= 'Нет';
     if (obj.lastAnswer){
       newAnswMessage='Есть';
     }
     if (obj.type =='project') {
       rows += `<tr class="success" data-id="${obj._id}">`;
       link = 'https://fl.ru/projects/'+ obj.projectId;
     }
     else {
       rows +='<tr class="info" data-id="${obj._id}">';}
     //console.log(link);
     rows += `<td> ${obj.projectId} </td><td> ${obj.projectName} </td><td> ${obj.profile} </td><td><a href="${link}">${obj.projectId}</a>  </td>`;
     rows +=`<td> ${obj.lastMessage} </td>${notesTd}<td> ${newAnswMessage} </td>`;
     rows +='</tr>'
   });
   rows = header + rows;
   $table.html(rows);
 }
});
