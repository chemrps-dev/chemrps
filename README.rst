ChemRPS (Chemical Registration & Publishing System)
===================================================

Overview
--------

**ChemRPS** .. image:: docs/_images/chemrps_logo_blue.jpg is a free Docker based system that allows you 
to load and search SDFiles by structure on your corporate website or local computer.

The system comes with a preconfigured RDKit enabled PostGresql database, a search engine (API) and 
preconfigured register/search web pages including structure editor (Ketcher from EPAM).
It also contains a program that allows you to bulk load SDFiles.

ChemRPS is intended to be used by small or medium sized companies looking for an easy way to make
their chemical structures searchable on the Internet, without the need to invest a lot of money
for license fees or programming services.


Because of the easy deployment ChemRPS can also be used by individuals looking for an 'out-of-the-box'
solution that allows them to make structures contained in SDFiles searchable via Substructure and/or
Structure similarity search.


Installation

Download and install Docker
Link to installer page:<https://docs.docker.com/install/>

How to verify that Docker works?

Windows

-Open command prompt
-Execute the following command:
 docker version

You should get an output similar to the below:
.. image:: docs/_images/chemrps_picture_1.png

 docker-compose –version

You should get an output similar to the below:
.. image:: docs/_images/chemrps_picture_2.png

Run simple test program

-Open command prompt
-Execute the following command:
 docker run hello-world
You should get an output similar to the below:

.. image:: docs/_images/chemrps_picture_3.png

Linux

Open a terminal and run the following command:

 docker version

You should get an output similar to the below:
.. image:: docs/_images/chemrps_picture_4.png

 docker-compose –version
You should get an output similar to the below:
.. image:: docs/_images/chemrps_picture_5.png 

Run simple test program (with sudo or root rights)
 docker run hello-world

You should get an output similar to the below:
.. image:: docs/_images/chemrps_picture_6.png

Bugs, Comments and anything else
--------------------------------

For any bug or problem reports, contact me at my email contact@hjhimmler.de

Hans-Juergen Himmler, 2020-01-27
