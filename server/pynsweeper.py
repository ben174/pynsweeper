#!/usr/bin/env python

import random

def main():
    size = 10
    bombs = 20
    print create_board(size, bombs)


def create_board(size, bombs):
    board = []
    for i in xrange(size):
        board.append(['-'] * size)
    lay_bombs(board, bombs)
    calc_heat(board)
    print_board(board)
    return board


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
            left = max(0, x-1)
            right = x+2
            up = max(0, y-1)
            down = min(size, y+1)
            cells = []
            if y > 0:
                cells.extend(board[up][left:right])
            if y < size-1:
                cells.extend(board[down][left:right])
            cells.extend(board[y][left:right])
            heat_count = len([v for v in cells if v == '*'])
            board[y][x] = heat_count


def print_board(board):
    for row in board:
        row_str = ''
        for cell in row:
            row_str += str(cell) + ' '
        print row_str


if __name__ == '__main__':
    main()
