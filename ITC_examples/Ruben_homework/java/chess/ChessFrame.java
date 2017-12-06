import java.awt.Color;
import java.awt.Dimension;
import java.awt.GridLayout;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.image.BufferedImage;

import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.border.LineBorder;

import java.io.File;
import javax.imageio.ImageIO;
import java.awt.Image;
import java.io.IOException;

import figurs.*;

public class ChessFrame extends JFrame implements ActionListener {
    private final JButton[][] boardField = new JButton[8][8];
    private static boolean selected = true;
    private JPanel board = new JPanel(new GridLayout(8,8));

    public ChessFrame() {
        for (int i = 0; i < boardField.length; ++i) {
            for (int j = 0; j < boardField[i].length; ++j) {
                JButton b = new JButton();
                b.addActionListener(this);
                b.putClientProperty("row", i);
                b.putClientProperty("col", j);
                b.putClientProperty("color", "blue");
                b.setOpaque(true);
                b.setPreferredSize(new Dimension(100,100));
                if ((j % 2 == 1 && i % 2 == 1) || (j % 2 == 0 && i % 2 == 0)) {
                    b.setBackground(Color.WHITE);
                } else {
                    b.setBackground(Color.GRAY);
                }
                boardField[i][j] = b;
                board.add(boardField[i][j]);
            }
        }
        addFigure(board);
        this.add(board);

    }
	
    private int row = 0, col = 0, newRow, newCol;
    private Piece p1 = null, p2 = null;
    public void actionPerformed(ActionEvent e) {
        JButton b = (JButton)e.getSource();
        if (selected) {
	    row = (int)(b.getClientProperty("row"));
	    col = (int)(b.getClientProperty("col"));
	    p1 = (Piece)(b.getClientProperty("piece"));
	    if(p1 != null){
                selected = false;
	    }
        } else {
            newRow = (int)(b.getClientProperty("row"));
	    newCol = (int)(b.getClientProperty("col"));
	    if(p1.step(row, col, newRow, newCol)){
	        moves(row, col, newRow, newCol);
	    }
	    selected = true;
        }
    }

    public void addFigure(JPanel board) {
        try {
            String[] black = {"image/br.gif", "image/bn.gif", "image/bp.gif", "image/bq.gif", "image/bk.gif", "image/bp.gif", "image/bn.gif", "image/br.gif"};
            String[] white = {"image/wr.gif", "image/wn.gif", "image/wb.gif", "image/wq.gif", "image/wk.gif", "image/wb.gif", "image/wn.gif", "image/wr.gif"};
	    Piece[] blackPiece = {new Rook("R"), new Knight("KN"), new Bishop("B"), new Queen("Q"), new King("K"), new Bishop("B"), new Knight("KN"), new Rook("R")};
	    Piece[] whitePiece = {new Rook("r"), new Knight("kn"), new Bishop("b"), new Queen("q"), new King("k"), new Bishop("b"), new Knight("kn"), new Rook("r")};

            for (int i = 0, j = 0; j < 8; ++j) {
                Image img = ImageIO.read(getClass().getResource(black[j]));
                img = img.getScaledInstance( 50, 50,  java.awt.Image.SCALE_SMOOTH );
                boardField[i][j].putClientProperty("piece", blackPiece[j]);
                boardField[i][j].putClientProperty("color", "black");
		boardField[i][j].setIcon(new ImageIcon(img));
            }


            for (int i = 7, j = 0, k = 0; j < 8; ++j) {
                Image img = ImageIO.read(getClass().getResource(white[j]));
                img = img.getScaledInstance( 50, 50,  java.awt.Image.SCALE_SMOOTH );
                boardField[i][j].putClientProperty("piece", whitePiece[j]);
                boardField[i][j].putClientProperty("color", "white");
                boardField[i][j].setIcon(new ImageIcon(img));
            }

            for (int i = 0; 8 > i; i++) {
                Image img = ImageIO.read(getClass().getResource("image/bp.gif"));
                img = img.getScaledInstance( 50, 50,  java.awt.Image.SCALE_SMOOTH );
		Piece pawn = new Pawn("P");
                boardField[1][i].putClientProperty("piece", pawn);
                boardField[1][i].putClientProperty("color", "black");
                boardField[1][i].setIcon(new ImageIcon(img));
            }

            for (int i = 0; 8 > i; i++) {
                Image img = ImageIO.read(getClass().getResource("image/wp.gif"));
                img = img.getScaledInstance( 50, 50,  java.awt.Image.SCALE_SMOOTH );
		Piece pawn = new Pawn("p");
                boardField[6][i].putClientProperty("piece", pawn);
                boardField[6][i].putClientProperty("color", "white");
                boardField[6][i].setIcon(new ImageIcon(img));
            }
        } catch(IOException e) {
            System.out.println(e);
        }
    }

    public void moves(int row, int col, int newRow, int newCol){
	if(((row != newRow || col != newCol) && boardField[row][col].getClientProperty("color") != boardField[newRow][newCol].getClientProperty("color"))){
	    boardField[newRow][newCol].setIcon(boardField[row][col].getIcon());;
	    boardField[row][col].setIcon(null);
	    boardField[newRow][newCol].putClientProperty("piece", boardField[row][col].getClientProperty("piece"));
	    boardField[newRow][newCol].putClientProperty("color", boardField[row][col].getClientProperty("color"));
            boardField[row][col].putClientProperty("piece", null);
            boardField[row][col].putClientProperty("color", "blue");
        }
    }
}

