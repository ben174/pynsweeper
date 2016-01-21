#!/usr/bin/env python

import random

def main():
    size = 10
    bombs = 4
    board = []
    for i in xrange(size):
        board.append([0] * size)
    lay_bombs(board, bombs)
    print_board(board)


def lay_bombs(board, bomb_count):
    bombs_laid = 0
    while bombs_laid < bomb_count:
        x, y = random.randrange(len(board)), random.randrange(len(board))
        if not board[x][y]:
            board[x][y] = 1
            bombs_laid += 1



def print_board(board):
    for row in board:
        print row

# ------x------
# -----x---x-x-
# -------------
# ----x--------
# -------------
# -------------

if __name__ == '__main__':
    main()
