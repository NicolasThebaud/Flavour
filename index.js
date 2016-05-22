/*************************************************************/
$(document).on('click', '.flavour-setup', function(){
  var flavour = $(this)
  $('[flavour],[flavour-text]').not('.flavour-setup').each(function(){
    $(this).attr($(this).is('[flavour]')?'flavour':'flavour-text', $(flavour).attr('flavour-text'))})
  $(document).trigger('flavoured')
})

//min
/*$(document).on("click",".flavour-setup",function(){var t=$(this),$("[flavour],[flavour-text]").not(".flavour-setup").each(function(){$(this).attr($(this).is("[flavour]")?"flavour":"flavour-text",$(t).attr("flavour-text"))}),$(document).trigger("flavoured")})*/
/*************************************************************/


// flavouring the body ( codepen doesn't expose the body tag )
$('body').attr('flavour', '1')

$(document).on('flavoured', function(e) {
   console.log(e)
})
