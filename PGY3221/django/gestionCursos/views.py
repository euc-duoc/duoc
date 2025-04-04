from django.shortcuts import render

# Create your views here.
def principal(request):
    grupos = [
        {
            'id': 1, 
            'nombre': "Grupo 1",
            'imgUrl': "https://comicbook.com/wp-content/uploads/sites/4/2024/08/00a76fda-bc0b-4efb-a915-12c228a0530a.jpg"
        },
        { 
            'id': 2, 
            'nombre': "Grupo 2",
            'imgUrl': "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9u_QswDGqIhmYFzd5cRdvr1dGi8LItcrnzQ&s"
        },
        { 
            'id': 3,
            'nombre': "Grupo 3",
            'imgUrl': "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFtS8igApINY_4F2TTAZrklhNujdTkqzVIgg&s"
        },
        { 
            'id': 4,
            'nombre': "Grupo 4",
            'imgUrl': "https://static.wikia.nocookie.net/series-animadas-del-pasado/images/d/d5/C19a688c17bc147da763b59748f10eefcaptain-planet_.jpg/revision/latest?cb=20130921151819&path-prefix=es"
        },
        {
            'id': 5, 
            'nombre': "Grupo 5",
            'imgUrl': "https://i.guim.co.uk/img/media/978bb76aaf05d05513f35f26c73ea61ad28b7f60/0_614_2628_1577/master/2628.jpg?width=465&dpr=1&s=none&crop=none"
        },
        {
            'id': 3, 
            'nombre': "Grupo 6",
            'imgUrl': "https://majorspoilers.com/wp-content/uploads/2024/03/X-Men-97-1.jpg"
        }
    ]

    datos = { 'grupos': grupos }
    return render(request, 'index.html', datos)

def grupo(request, id):
    datos = { 'mensaje': "Se dio click al grupo con ID " + str(id) }
    return render(request, 'grupo.html', datos)

def agregar_grupo(request):
    return render(request, 'agregar_grupo.html')