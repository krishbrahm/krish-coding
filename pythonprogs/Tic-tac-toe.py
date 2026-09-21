#imports
import turtle as l

#initializations
x_list = []
o_list = []
whowon = ''
t = l.Turtle()
s = l.Screen()
s.bgcolor("black")
turn = 1
open_spaces = list(range(1, 10))
winning_combinations = [ [1, 2, 3,], [4, 5, 6,], [7, 8, 9,], [1, 4, 7], [2, 5, 8,], [3, 6, 9,],
[1, 5, 9,], [3, 5, 7]]

#functions

def drawBoard():
  drawLines(-60,180,'ver')
  drawLines(60,180,'ver')
  drawLines(-180,60,'hor')
  drawLines(-180,-60,'hor')
  print("Let's play tic-tac-toe!")

def drawLines(x,y,dir):
  if dir == 'ver':
      t.setheading(90)
  else:
      t.setheading(180)
  t.up()
  t.setpos(x,y) 
  t.down()
  t.backward(360)

def drawMoves(turn, tile):
  #set positions to start     
  t.up()
  if tile == 1:
      t.setpos(-180, 180)
  elif tile == 2:
       t.setpos(-60, 180)
  elif tile == 3:
       t.setpos(60, 180)
  elif tile == 4:
      t.setpos(-180, 60)
  elif tile == 5:
      t.setpos(-60, 60)
  elif tile == 6:
      t.setpos(60, 60)
  elif tile == 7:
      t.setpos(-180, -60)
  elif tile == 8:
      t.setpos(-60, -60)
  elif tile == 9:
      t.setpos(60, -60)

  #Draw X or O, and add to their respective lists
  if turn == 1:
      t.pencolor("#7DF9FF")
      draw_x()
      x_list.append(tile)
  else:
      t.pencolor("#FF4444")
      draw_o()
      o_list.append(tile)

def draw_x():
    t.setheading(-45)
    t.down()
    t.goto(t.xcor() + 120, t.ycor() - 120)
    t.setheading(45)
    t.up()
    t.goto(t.xcor() - 120, t.ycor())
    t.down()
    t.goto(t.xcor() + 120, t.ycor() + 120)
  
def draw_o():
    t.setpos(t.xcor()+24, t.ycor()-24)
    t.down()  
    t.circle(-50)

def getInput():
    while True:
      try:
          tile = int(input(f"Which tile? {open_spaces} only. "))
          if tile not in open_spaces:
            raise ValueError(f"Pick only between these tiles: {str(open_spaces).strip('[]')}")
          open_spaces.remove(tile)
          return tile
      except ValueError as e:
          print(e)

def checkWin(who):
  checkList = []
  if who == 1:
    checkList = x_list
    who = 'X'
  else:
    checkList = o_list
    who = 'O'

  for wcomb in winning_combinations:
    count = 0
    for num in checkList:
       if num in wcomb:
         count += 1
    if count == 3:
        return who

  return ''

def announceMove():
  if turn == 1:
    print("It is X's turn!")
  else:
    print("It is O's turn!")
#Prepare
t.pencolor("#FFFFFF")
drawBoard()

#Play!
while True:
  announceMove()

  while True:
    try:
        tile = int(input(f"Which tile? {open_spaces} only. "))
        if tile not in open_spaces:
          raise ValueError(f"Pick only between these tiles: {open_spaces}")
        open_spaces.remove(tile)
        break
    except ValueError as e:
        print(e)
    
  drawMoves(turn, tile)
  
  whowon = checkWin(turn)
  if whowon == 'X' or whowon == 'O':
      print(f'{whowon} won!!!')
      break
  
  #Switch turns
  turn *= -1
  
  if open_spaces == []:
    print('It is a draw!')
l.done()    