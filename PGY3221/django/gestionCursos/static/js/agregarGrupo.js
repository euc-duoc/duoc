$(document).ready(function(){
    $('#botonAgregarIntegrante').click(function() {
        const nombre = $('#agregarIntegranteNombre').val();

        if(nombre !== '')
            $('#integrantesGrupo').append(
                $(`<li class="list-group-item miembroGrupo">
                    <button type="button" class="btn btn-danger miembroGrupo">X</button>
                    <span>${nombre}</span>
                </li>`)
            );

            $('#agregarIntegranteNombre').val("");
    });

    $(document).on("click", ".miembroGrupo", function() {
        $(this).remove();
    });

    $("#formulario").on("submit", function(e) {
        const input = $("#agregarIntegranteNombre")[0];

        if($("#integrantesGrupo li span").length == 0) {                        
            input.setCustomValidity("Debe ingresar al menos un integrante.");
            input.reportValidity();
            input.setCustomValidity("");
            e.preventDefault()
        }
        else {
            $("#agregarIntegranteNombres").val("");

            $("#integrantesGrupo li span").each(function(i) {
                $("#agregarIntegranteNombres").val(
                    $("#agregarIntegranteNombres").val() + (i > 0 ? "," : "") + $(this).text()
                );
            });
        }
    });
});