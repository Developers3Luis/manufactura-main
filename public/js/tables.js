Paginador = function(divPaginador, tabla, tamPagina)
{
    try {
        this.miDiv = divPaginador; //un DIV donde irán controles de paginación
        this.tabla = tabla;           //la tabla a paginar
        this.tamPagina = tamPagina; //el tamaño de la página (filas por página)
        this.pagActual = 1;         //asumiendo que se parte en página 1
        this.paginas = Math.floor((this.tabla.rows.length - 1) / this.tamPagina); //¿?
    
    } catch (error) {
        
    }
    
    this.SetPagina = function(num)
    {
        if (num < 0 || num > this.paginas)
            return;
 
        this.pagActual = num;
        var min = 1 + (this.pagActual - 1) * this.tamPagina;
        var max = min + this.tamPagina - 1;
 
        for(var i = 1; i < this.tabla.rows.length; i++)
        {
            if (i < min || i > max)
                this.tabla.rows[i].style.display = 'none';
            else
                this.tabla.rows[i].style.display = '';
        }
        this.miDiv.firstChild.rows[0].cells[1].innerHTML = this.pagActual;
    }
 
    this.Mostrar = function()
    {
        //Crear la tabla
        var tblPaginador = document.createElement('table');
 
        //Agregar una fila a la tabla
        var fil = tblPaginador.insertRow(tblPaginador.rows.length);
 
        //Ahora, agregar las celdas que serán los controles
        var ant = fil.insertCell(fil.cells.length);
        ant.innerHTML = 'Anterior';
        ant.className = 'btn btn-link'; //con eso le asigno un estilo
        var self = this;
        ant.onclick = function()
        {
            if (self.pagActual == 1)
                return;
            self.SetPagina(self.pagActual - 1);
        }
 
        var num = fil.insertCell(fil.cells.length);
        num.innerHTML = ''; //en rigor, aún no se el número de la página
        num.className = 'pag_num';
 
        var sig = fil.insertCell(fil.cells.length);
        sig.innerHTML = 'Siguiente';
        sig.className = 'btn btn-link';
        sig.onclick = function()
        {
            if (self.pagActual == self.paginas)
                return;
            self.SetPagina(self.pagActual + 1);
        } 
        try {
        this.miDiv.appendChild(tblPaginador);
        if (this.tabla.rows.length - 1 > this.paginas * this.tamPagina)
        this.paginas = this.paginas + 1;

          this.SetPagina(this.pagActual);
        } catch (error) {
            
        }
        //Como ya tengo mi tabla, puedo agregarla al DIV de los controles
 
        //¿y esto por qué?
       
    }
}



function initPaginator(){ 
    var p = new Paginador(
        document.getElementById('paginador'),
        document.getElementById('tblDatos'),
        12
    );
    p.Mostrar(); 
}

initPaginator();