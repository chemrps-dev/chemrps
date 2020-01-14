﻿var chemrpsserviceurlprefix;
var searchresultarray;
var pagenum;

function isNotEmpty(value) {



    if (typeof value !== 'undefined') {



        if (value !== null) {


            if (value) {



                return true;


            } else {




                return false;


            }



        } else {


            return false;


        }






    } else { return false; }



}

function Performsearch(compoundnamequery, structurequery) {


    

    var query;

    if (isNotEmpty(compoundnamequery) && !isNotEmpty(structurequery)) {

        // compound name only search

        var compoundnamesearchoperator = $("input[name='compoundnameoptions']:checked").val();

        query = {
            "condition": "AND",
            "rules": [
                {
                    "id": "compoundname",

                    "type": "string",
                    "input": "text",
                    "operator": compoundnamesearchoperator,
                    "value": compoundnamequery,
                    "data":
                    {
                        "path": "compounds",
                        "dbfield": "compound_no",
                        "bcfregno": 2
                    }
                }
            ],
            "valid": true,
            "setdomain": false,
            "userinitials": "viewer"

        }



    } else if (!isNotEmpty(compoundnamequery) && isNotEmpty(structurequery)) {

        // structure only search

        var structuresearchoperator = $("input[name='structuresearchoptions']:checked").val();



        var structuresearchvalue = "rdkit.mol_to_ctab(" + "|" + structurequery + "|" + "::rdkit.mol)";

        if (structuresearchoperator === "similarity") {

            var similarityvalue = $('#simvalue').jqxNumberInput('val');
            

            

            query = {
                "condition": "AND",
                "rules": [
                    {
                        "id": "molstructure",
                        "field": "molecule",
                        "type": "molsearch",
                        "input": "text",
                        "operator": structuresearchoperator,
                        "value": structuresearchvalue,
                        "options": similarityvalue,
                        "data":
                        {
                            "path": "compounds",
                            "dbfield": "molecule",
                            "bcfregno": 2
                        }
                    }
                ],
                "valid": true,
                "setdomain": false,
                "userinitials": "viewer"

            }

        } else {

            query = {
                "condition": "AND",
                "rules": [
                    {
                        "id": "molstructure",
                        "field": "molecule",
                        "type": "molsearch",
                        "input": "text",
                        "operator": structuresearchoperator,
                        "value": structuresearchvalue,
                        "options": "",
                        "data":
                        {
                            "path": "compounds",
                            "dbfield": "molecule",
                            "bcfregno": 2
                        }
                    }
                ],
                "valid": true,
                "setdomain": false,
                "userinitials": "viewer"

            }



        }



    } else if (isNotEmpty(compoundnamequery) && isNotEmpty(structurequery)) {



        

        // combined name and structure search

        var compoundnamesearchoperator = $("input[name='compoundnameoptions']:checked").val();

        var structuresearchoperator = $("input[name='structuresearchoptions']:checked").val();



        var structuresearchvalue = "rdkit.mol_to_ctab(" + "|" + structurequery + "|" + "::rdkit.mol)";

        if (structuresearchoperator === "similarity") {

            var similarityvalue = $('#simvalue').jqxNumberInput('val');
            

            query = {
                "condition": "AND",
                "rules": [
                    {
                        "id": "compoundname",

                        "type": "string",
                        "input": "text",
                        "operator": compoundnamesearchoperator,
                        "value": compoundnamequery,
                        "data":
                        {
                            "path": "compounds",
                            "dbfield": "compound_no",
                            "bcfregno": 2
                        }
                    },
                    {
                        "id": "molstructure",
                        "field": "molecule",
                        "type": "molsearch",
                        "input": "text",
                        "operator": structuresearchoperator,
                        "value": structuresearchvalue,
                        "options": similarityvalue,
                        "data":
                        {
                            "path": "compounds",
                            "dbfield": "molecule",
                            "bcfregno": 2
                        }
                    }
                ],
                "valid": true,
                "setdomain": false,
                "userinitials": "viewer"

            }

        } else {

            query = {
                "condition": "AND",
                "rules": [
                    {
                        "id": "compoundname",

                        "type": "string",
                        "input": "text",
                        "operator": compoundnamesearchoperator,
                        "value": compoundnamequery,
                        "data":
                        {
                            "path": "compounds",
                            "dbfield": "compound_no",
                            "bcfregno": 2
                        }
                    },
                    {
                        "id": "molstructure",
                        "field": "molecule",
                        "type": "molsearch",
                        "input": "text",
                        "operator": structuresearchoperator,
                        "value": structuresearchvalue,
                        "options": "",
                        "data":
                        {
                            "path": "compounds",
                            "dbfield": "molecule",
                            "bcfregno": 2
                        }
                    }
                ],
                "valid": true,
                "setdomain": false,
                "userinitials": "viewer"

            }




        }



        

    }


    



    


    















    var jsonstring = JSON.stringify(query);

    var input = {}


    input.data = jsonstring;



    


    input.userinitials = "viewer";



   



    $("#jqxLoader").jqxLoader("open");









    
    $.ajax({

        async: true,
        type: "POST",


        url: chemrpsserviceurlprefix + 'FastExecutequery',



        cache: false,




        data: JSON.stringify(input),




        contentType: "application/json",

        dataType: "json",

        success: function (response) {


            

            $('#jqxLoader').jqxLoader('close');

            

            if (response.bError) {


                alert(response.errortext);


            } else {



                

                var numberofhits = response.compounditems.length;


                if (numberofhits == 0) {



                    alert("No hit(s) found");

                    return;


                }

                

                


                pagenum = 0;

                searchresultarray = [];

                for (var i = 0; i < response.compounditems.length; i++) {

                    searchresultarray.push(response.compounditems[i].name);




                }


                var paginginformation = $("#grid").jqxGrid('getpaginginformation');

                var data = [];

                for (var i = 0; i < paginginformation.pagesize; i++) {



                    if (i < searchresultarray.length) {


                        var compoundid = searchresultarray[i];

                        data.push(compoundid);

                    }












                }

                var input = {}

                input.compoundidlist = data;

                input.userinitials = "viewer";


                $.ajax({

                    async: true,
                    type: "POST",


                    url: chemrpsserviceurlprefix + 'RetrieveStructureinformationforcompoundidlist',



                    cache: false,




                    data: JSON.stringify(input),




                    contentType: "application/json",

                    dataType: "json",

                    success: function (myresponse) {


                        

                        if (myresponse.bError) {


                            alert(myresponse.errortext);


                        } else {


                            


                            var compounditemssource = {

                                datatype: "json",

                                datafields: [


                                    { name: 'name', type: 'string' },
                                    { name: 'picture', type: 'string' },
                                    { name: 'molweight', type: 'number' },
                                    { name: 'sumformula', type: 'string' }


                                ]





                            };



                            for (var i = 0; i < paginginformation.pagesize; i++) {

                                if (i < searchresultarray.length) {

                                    response.compounditems[i].picture = myresponse.compounditemlist[i].picture;

                                    response.compounditems[i].molweight = myresponse.compounditemlist[i].molweight;

                                    response.compounditems[i].sumformula = myresponse.compounditemlist[i].sumformula;
                                }


                                

                            }


                            compounditemssource.localdata = response.compounditems;

                            var compounditemsdataAdapter = new $.jqx.dataAdapter(compounditemssource);


                            $("#grid").jqxGrid({ source: compounditemsdataAdapter });








                        }




                    },
                    error: function (xhr, status, exception) {



                        



                        alert(this.url + " call error. Message: " + exception);





                    }
                });

























                

            }




        },
        error: function (xhr, status, exception) {

            $('#jqxLoader').jqxLoader('close');

            



            alert(this.url + " call error. Message: " + exception);





        }
    });



}

$(document).ready(function () {

    

    $("#btn_transferstructuretostructurequeryketcher").jqxButton({ height: 40 });

    $("#btn_transferstructuretostructurequeryketcher").on('click', function () {


        var structurezoomwindow_ketcherFrame = document.getElementById('ketcher-frame-zoomwindow');

        var structurezoomwindow_ketcher = structurezoomwindow_ketcherFrame.contentWindow.ketcher;

        var structurezoomwindow_querysmiles = structurezoomwindow_ketcher.getSmiles();

        

        if (!isNotEmpty(structurezoomwindow_querysmiles)) {

            alert("No structure to transfer found")

            return;
        }

        var structuresearchketcherFrame = document.getElementById('ketcher-frame-structurequery');
        var structuresearchketcher = structuresearchketcherFrame.contentWindow.ketcher;


        var structurezoomwindow_querymolfile = structurezoomwindow_ketcher.getMolfile();


        structuresearchketcher.setMolecule(structurezoomwindow_querymolfile);


        $('#structurezoomwindow').jqxWindow('close');

        

        

    });

    $('#structurezoomwindow').jqxWindow({





        

        height: '90%',

        width: '90%',

        draggable: true,

        resizable: true,

        showCloseButton: true,



        autoOpen: false,


        isModal: true,




        


        initContent: function () {




        }

    });

    
    
    $("#jqxLoader").jqxLoader({ isModal: true, width: 100, height: 60, imagePosition: 'top', text: "" });

    

    $("#simvalue").jqxNumberInput({ width: '100px', height: '25px', inputMode: 'simple', spinButtons: true, allowNull: false, decimalDigits: 0, min: 1, decimal: 10, disabled: true });

    $('input[type=radio][name=structuresearchoptions]').change(function () {

        

        if (this.value == 'similarity') {
            $("#simvalue").jqxNumberInput({ disabled: false });
        }
        else {
            $("#simvalue").jqxNumberInput({ disabled: true });
        }
    });

    

    $.ajax({

        async: false,

        type: "GET",




        
        
        url: "http://SERVERNAME:5003/api/chemrps/GetchemrpsserviceURLPrefixinfo",
        //url: "http://168.63.97.158:5003/api/chemrps/" + "GetchemrpsserviceURLPrefixinfo",



        contentType: "application/json; charset=utf-8",

        dataType: "json",

        cache: false,







        success: function (response) {


            if (response.bError) {

                alert(response.errortext)


            } else {


                
                chemrpsserviceurlprefix = response.chemrpsserviceurlprefix;











            }


        },
        error: function (xhr, status, exception) {



            alert(this.url + " call error. Message: " + exception);


        }
    });


    var svgrenderer = function (row, column, value) {

        
        return '<div style="transform: scale(0.5);transform-origin: top center; height: 100px;  width: 200px">' + value + '</div>';
    }


    

    $("#grid").on("cellclick", function (event) {

        


        
        
        var args = event.args;
        // row's bound index.
        var rowBoundIndex = args.rowindex;
        // row's visible index.
        var rowVisibleIndex = args.visibleindex;
        // right click.
        var rightClick = args.rightclick;
        // original event.
        var ev = args.originalEvent;
        // column index.
        var columnIndex = args.columnindex;
        // column data field.
        var dataField = args.datafield;

        
        // cell value
        var value = args.value;

        

        if (dataField === "picture") {

            if (isNotEmpty(value)) {

                var dataRecord = $("#grid").jqxGrid('getrowdata', rowBoundIndex);

                var compoundname = dataRecord.name;

                


                if (isNotEmpty(compoundname)) {

                    $.ajax({


                        async: true,
                        type: "GET",



                        url: chemrpsserviceurlprefix + "GetCompoundStructureinformation/" + compoundname + "/"+"true/false"+"/" + "viewer",



                        cache: false,






                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (response) {




                            if (response.bError) {


                                alert(response.errortext)


                            } else {



                                

                                var ketcherFrame = document.getElementById('ketcher-frame-zoomwindow');

                                ketcher = ketcherFrame.contentWindow.ketcher;

                                ketcher.setMolecule(response.rdkitmolfile);

                                $('#structurezoomwindow').jqxWindow('open');

                            }





                        },
                        error: function (xhr, status, exception) {

                            alert(this.url + " call error. Message: " + exception);



                        }
                    });

                }



            }


        }





        


    });

    

    

    var rendergridrows = function (start, end, gotopagenum) {




        






        var data = [];

        for (var i = start; i < end; i++) {



            if (i < searchresultarray.length) {


                var compoundid = searchresultarray[i];

                data.push(compoundid);

            }












        }

        var input = {}

        input.compoundidlist = data;

        input.userinitials = "viewer";


        $.ajax({

            async: true,
            type: "POST",


            url: chemrpsserviceurlprefix + 'RetrieveStructureinformationforcompoundidlist',



            cache: false,




            data: JSON.stringify(input),




            contentType: "application/json",

            dataType: "json",

            success: function (response) {



                

                if (response.bError) {


                    alert(response.errortext);


                } else {


                    

                    var mycompounditemssource = $('#grid').jqxGrid('source');

                    var mynewsource = [];


                    for (var i = 0; i < mycompounditemssource.records.length; i++) {


                        mynewsource.push(mycompounditemssource.records[i]);


                    }


                    

                    var index = 0;


                    for (var i = start; i < end; i++) {

                        if (i < searchresultarray.length) {

                            mynewsource[i].picture = response.compounditemlist[index].picture;

                            mynewsource[i].molweight = response.compounditemlist[index].molweight;

                            mynewsource[i].sumformula = response.compounditemlist[index].sumformula;

                        }






                        



                        index++;

                    }

                    var compounditemssource = {

                        datatype: "json",

                        datafields: [


                            { name: 'name', type: 'string' },
                            { name: 'picture', type: 'string' },
                            { name: 'molweight', type: 'number' },
                            { name: 'sumformula', type: 'string' }


                        ]





                    };

                    compounditemssource.localdata = mynewsource;

                    var compounditemsdataAdapter = new $.jqx.dataAdapter(compounditemssource);

                    $("#grid").jqxGrid({ source: compounditemsdataAdapter });


                    

                    pagenum = args.pagenum;

                    $("#grid").jqxGrid('gotopage', gotopagenum);




                    








                }




            },
            error: function (xhr, status, exception) {



                



                alert(this.url + " call error. Message: " + exception);





            }
        });




    }

    

    var self = this;

    var pagerrenderer = function () {



        var element = $("<div style='margin-left: 10px; margin-top: 11px; width: 100%; height: 100%;'></div>");
        var datainfo = $("#grid").jqxGrid('getdatainformation');
        var paginginfo = datainfo.paginginformation;
        var leftButton = $("<div style='padding: 0px; float: left;'><div style='margin-left: 9px; width: 16px; height: 16px;'></div></div>");
        leftButton.find('div').addClass('jqx-icon-arrow-left');
        leftButton.width(36);
        
        var rightButton = $("<div style='padding: 0px; margin: 0px 3px; float: left;'><div style='margin-left: 9px; width: 16px; height: 16px;'></div></div>");
        rightButton.find('div').addClass('jqx-icon-arrow-right');
        rightButton.width(36);
        
        leftButton.appendTo(element);
        rightButton.appendTo(element);
        var label = $("<div style='font-size: 11px; margin: 2px 3px; margin-top:-5px; font-weight: bold; float: left;'></div>");
        label.text("1-" + paginginfo.pagesize + ' of ' + datainfo.rowscount);
        label.appendTo(element);
        self.label = label;
        // update buttons states.
        var handleStates = function (event, button, className, add) {
            button.on(event, function () {
                if (add == true) {
                    button.find('div').addClass(className);
                }
                else button.find('div').removeClass(className);
            });
        }
        
        rightButton.click(function () {

            var datainfo = $("#grid").jqxGrid('getdatainformation');

            var paginginfo = datainfo.paginginformation;


            var pagescount = paginginfo.pagescount;

            if (paginginfo.pagenum < pagescount) {













                

                var newpagenum = paginginfo.pagenum + 1;

                


                var start = newpagenum * paginginfo.pagesize;

                var end = (newpagenum * paginginfo.pagesize) + paginginfo.pagesize;



                var compounditemssource = $('#grid').jqxGrid('source');


                var compounditem = compounditemssource.records[start];


                if (isNotEmpty(compounditem.sumformula)) {

                    $("#grid").jqxGrid('gotopage', newpagenum);


                } else {

                    rendergridrows(start, end, newpagenum);



                }



                





            }

            










            
        });
        leftButton.click(function () {

            var datainfo = $("#grid").jqxGrid('getdatainformation');

            var paginginfo = datainfo.paginginformation;

            


            if (paginginfo.pagenum > 0) {


                var newpagenum = paginginfo.pagenum - 1;

                

                var start = newpagenum * paginginfo.pagesize;

                var end = (newpagenum * paginginfo.pagesize) + paginginfo.pagesize;


                var compounditemssource = $('#grid').jqxGrid('source');


                var compounditem = compounditemssource.records[start];


                if (isNotEmpty(compounditem.sumformula)) {

                    $("#grid").jqxGrid('gotopage', newpagenum);


                } else {

                    rendergridrows(start, end, newpagenum);



                }

                

                
                







            }
            


            

            





            
        });
        return element;
    }

    $("#grid").on('pagechanged', function () {
        var datainfo = $("#grid").jqxGrid('getdatainformation');
        var paginginfo = datainfo.paginginformation;
        self.label.text(1 + paginginfo.pagenum * paginginfo.pagesize + "-" + Math.min(datainfo.rowscount, (paginginfo.pagenum + 1) * paginginfo.pagesize) + ' of ' + datainfo.rowscount);
    });

    $("#grid").jqxGrid({

        

        width: '100%',

        

        selectionmode: 'singlecell',

        

        columnsresize: true,

        

        rowsheight: 100,

        
        height: 570,

        pageable: true,

        pagerrenderer: pagerrenderer,

        

        columns: [
            { text: 'ID', datafield: 'name', width: 200 },
            { text: 'Structure (click cell to zoom)', datafield: 'picture', cellsrenderer: svgrenderer, width: 200},
            { text: 'Molweight', datafield: 'molweight', width: 100 },
            { text: 'Molformula', datafield: 'sumformula' }
        ]








    });



    $("#btn_search").click(function () {

        

        

        var compoundnamesearchvalue = $("#compoundname").val();




        

        var ketcherFrame = document.getElementById('ketcher-frame-structurequery');
        var ketcher = ketcherFrame.contentWindow.ketcher;



        var structuresearchquerysmiles = ketcher.getSmiles();


        

        if (!isNotEmpty(structuresearchquerysmiles) && !isNotEmpty(compoundnamesearchvalue)) {

            alert("Please specify query")


        } else {

            if (isNotEmpty(structuresearchquerysmiles) && isNotEmpty(compoundnamesearchvalue)) {

                var userselection = confirm("You are about to perform a COMBINED search for both compound ID and structure. Are you sure you want to continue?");

                if (userselection == true) {

                    
                    Performsearch(compoundnamesearchvalue, structuresearchquerysmiles);
                    
                }


            } else {


                
                
                

                Performsearch(compoundnamesearchvalue, structuresearchquerysmiles);

                



            }



        }

        





         
        




    }); 

    $("#btn_search").jqxButton({ width: 120, height: 40 });


});