package figurs;

public abstract class Piece {

    private int row;
    private int col;

    public int getRow() {
        return this.row;
    }

    public int getCol() {
        return this.col;
    }

    public void setRow(int x) {
        this.row = row;
    }

    public void setCol(int y) {
        this.col = col;
    }

    public int[] getPosition() {
        return new int[]{this.row, this.col};
    }

    public abstract String getType();
    public abstract String getColor();
    public abstract boolean step(int row, int col, int newRow, int newCol);
}
