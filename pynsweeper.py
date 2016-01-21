#!/usr/bin/env python

import random

def main():
    size = 10
    bombs = 20
    board = []
    for i in xrange(size):
        board.append(['-'] * size)
    lay_bombs(board, bombs)
    calc_heat(board)
    print_board(board)


def lay_bombs(board, bomb_count):
    bombs_laid = 0
    while bombs_laid < bomb_count:
        x, y = random.randrange(len(board)), random.randrange(len(board))
        if board[x][y] != '*':
            board[x][y] = '*'
            bombs_laid += 1

def calc_heat(board):
    size = len(board)
    for y, row in enumerate(board):
        for x, cell in enumerate(row):
            if cell == '*':
                continue
            heat_count = 0
            # left
            if x > 0:
                if board[y][x-1] == '*':
                    heat_count += 1
            # right
            if x+1 < size:
                if board[y][x+1] == '*':
                    heat_count += 1
            # up
            if y > 0:
                if board[y-1][x] == '*':
                    heat_count += 1
            # down
            if y+1 < size:
                if board[y+1][x] == '*':
                    heat_count += 1
            board[y][x] = heat_count







def print_board(board):
    for row in board:
        row_str = ''
        for cell in row:
            row_str += str(cell) + ' '
        print row_str

# ------x------
# -----x---x-x-
# -------------
# ----x--------
# -------------
# -------------

if __name__ == '__main__':
    main()
