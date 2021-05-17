#defines a compilator to use
CXX		  := g++
# defines flags to give to this compilator
# -Wall and -Wextra  will enable almost all warnings that compiler can give
# -std=c++XX defines the language standart
CXX_FLAGS := -Wall -Wextra -std=c++2a

# a folder where to save executable file
BIN		:= bin
# a folder where to get cpp files
SRC		:= src
# a folder where to get h or hpp files
INCLUDE	:= include
# a folder where to get frameworks
LIB		:= lib

# defines flags to give to compiltor to include external frameworks e.g. -lboost_filesystem
LIBRARIES	:= 
# defines a name of the executable file
EXECUTABLE	:= main

#defines flags to compiler for debug
DEGUB_FLAGS := -O0 -ggdb
#defines flags to compiler for release
RELEASE_FLAGS := -O3

ifeq ($(DEBUG), TRUE)
	CXX_FLAGS += $(DEGUB_FLAGS)
endif

ifeq ($(DEBUG), FALSE)
	CXX_FLAGS += $(RELEASE_FLAGS)
endif

# all is a target default target which call $(BIN)/$(EXECUTABLE) target
all: clean $(BIN)/$(EXECUTABLE)

# run is a target which call target clean then target all and run the executable file
run: clean all
	./$(BIN)/$(EXECUTABLE)

# $(BIN)/$(EXECUTABLE) is a target which generate a string with all cpp files in project (src folder). 
# To get them should be used $^.
# After all prerequisites it compile the executable with given params
# $@ - equal to $(EXECUTABLE)
$(BIN)/$(EXECUTABLE): $(SRC)/*.cpp $(SRC)/**/*.cpp
	$(CXX) $(CXX_FLAGS) -I$(INCLUDE)  -L$(LIB) $^ -o $@ $(LIBRARIES)

# clean is a target which clean folder <bin>
clean:
	powershell "rmdir -Force $(BIN) -recurse"
	powershell "New-Item -Path $(BIN) -ItemType 'Directory' -Force | Out-Null"