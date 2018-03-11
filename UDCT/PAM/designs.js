// When size is submitted by the user, call makeGrid()
$('input[type=submit]').click(function (e) {
    e.preventDefault();
    makeGrid();
    message.updateMessage("Grid Created");
});

$('#saveDraw').click(function (e) {
    e.preventDefault();
    if (draw.save())
        message.updateMessage("Grid Saved");
    else
        message.updateMessage("Nothing to save");
});

$('#loadDraw').click(function (e) {
    e.preventDefault();
    makeSavedGrid(draw.load());
});


function makeGrid() {
    grid.insertGrid(grid.buildGridMarkup(inputForm.getTableSize()));
    grid.setHandlers();
};

function makeSavedGrid(myGridObj) {
    try {
        grid.insertGrid(grid.buildGridMarkupFromOjb(myGridObj));
        grid.setHandlers();
        message.updateMessage("Grid Loaded");
    } catch (error) {
        message.updateMessage("Nothing to load");
    }
};


// Main grid object
const grid = {

    //gridObj stores current heigth, width and cells color
    gridObj: {
        gridObjName: "",
        gridObjHeigth: 0,
        gridObjWidth: 0,
        gridObjStruct: [],
        init: function (h, w) {
            this.gridObjHeigth = h;
            this.gridObjWidth = w;
            this.gridObjStruct.splice(0, this.gridObjStruct.length);
        }
    },

    // generate table markup from form input and update gridObject
    buildGridMarkup: function (tableSize) {
        let gridMarkup = "";
        let h = 0;
        let cellId = 0;
        //save/load grid feature
        this.gridObj.init(tableSize.heigth, tableSize.width);


        while (h < tableSize.heigth) {
            gridMarkup += '<tr id=tr_' + h + '>';
            for (let w = 0; w < tableSize.width; w++) {
                gridMarkup += '<td id=td_' + h + '_' + w + ' data-el=' + cellId++ + '></td>';
                this.gridObj.gridObjStruct.push('#fff');
            }
            gridMarkup += '</tr>'
            h++;

        }

        return gridMarkup;
    },
    // generate table  markup from saved draw and update gridObject
    buildGridMarkupFromOjb: function (myGridObj) {
        let gridMarkup = "";
        let h = 0;
        let cellId = 0;
        // store width height 
        this.gridObj.init(myGridObj.gridObjHeigth, myGridObj.gridObjWidth);

        while (h < myGridObj.gridObjHeigth) {
            gridMarkup += '<tr id=tr_' + h + '>';
            for (let w = 0; w < myGridObj.gridObjWidth; w++) {
                gridMarkup += '<td id=td_' + h + '_' + w + ' data-el=' + cellId + ' style="background-color:' + myGridObj.gridObjStruct[cellId] + '"></td>';
                // store cell color
                this.gridObj.gridObjStruct.push(myGridObj.gridObjStruct[cellId]);
                cellId++;
            }
            gridMarkup += '</tr>'
            h++;
        }
        return gridMarkup;
    },

    // add the table markup to the DOM
    insertGrid: function (gridMarkup) {
        $('#pixel_canvas').hide().empty().html(gridMarkup).fadeIn();

    },

    // save the draw in local storage | TODO: named save feature
    saveGrid: function (gridObjName = 'untitledDraw') {
        if (grid.gridObj.gridObjHeigth > 0 && grid.gridObj.gridObjWidth > 0) {
            localStorage.setItem(gridObjName, JSON.stringify(grid.gridObj));
            return true;
        } else {
            return false;
        }
    },

    // get saved draw object from local storage  | TODO: named save feature
    loadGrid: function (gridObjName) {
        let savedGrid = JSON.parse(localStorage.getItem(gridObjName));
        //console.log(savedGrid);
        return savedGrid;
    },

    //mouse events handlers
    setHandlers: function () {
        const table = $('#pixel_canvas');
        let mouseDown = false;

        table.mousedown(function () {
            mouseDown = true;
        });

        table.mouseup(function () {
            mouseDown = false;
        });

        //  mouse events listener to paint the cell
        $('#pixel_canvas td').each(function () {
            // paint <td> on click
            $(this).mousedown(function (e) {
                e.preventDefault();
                $(this).css('background-color', colorPicker.getColor());
                //update gridObj
                grid.gridObj.gridObjStruct[$(this).data('el')] = colorPicker.getColor();

            });
            // paint on drag while user move the mouse inside the table with left button clicked
            $(this).mouseenter(function () {
                if (mouseDown) {
                    $(this).css("background-color", colorPicker.getColor());
                    //update gridObj
                    grid.gridObj.gridObjStruct[$(this).data('el')] = colorPicker.getColor();

                }
            })
        })
    }
}


// Utilities 


const colorPicker = {
    getColor: function () {
        let color = $('#colorPicker').val();
        return color;
    }
}


const inputForm = {
    getTableSize: function () {
        let tableSize = {
            width: parseInt($('#input_width').val()),
            heigth: parseInt($('#input_height').val())
        }
        if (tableSize.width > 30) {
            tableSize.width = 30;
            console.log("max size error");
            message.enqueueMessage("W set to max");
        }
        if (tableSize.heigth > 30) {
            tableSize.heigth = 30;
            message.enqueueMessage("H set to max");
            console.log("max size error");
        }
        return tableSize;
    }
}


const message = {
    messageQueue: '',
    updateMessage: function (msg) {
        $('#message span').text("").fadeIn();
        $('#message span').text(this.messageQueue+msg).fadeOut(2500);
        this.messageQueue = '';
    },
    enqueueMessage: function (msg) {
        this.messageQueue += msg+' '
    }
    
}


const draw = {
    save: function (name) {
        return grid.saveGrid(name);
    },
    // TODO: 
    load: function (name = 'untitledDraw') {
        return grid.loadGrid(name);
    },
    // TODO:
    trash: function (draw) {
        //TODO
    },
    // TODO:
    list: function () {
        //TODO
    }

}