package figurs;

public class Bishop extends Piece {
    private String type;
    private String color;
    public Bishop(String type) {
        this.type = type;
	if(this.type == " b"){
            this.color = "white";
        } else {
            this.color = "black";
        }
    }

    public Bishop(String type, int row, int col) {
        super.setRow(row);
        super.setCol(col);
        this.type = type;
    }


    public void setType(String type) {
        this.type = type;
    }

    public String getType() {
        return this.type;
    }
    public String getColor() {
        return this.color;
    }
    
    public boolean step(int row, int col, int newRow, int newCol) {
            if(Math.abs(newRow - row) == Math.abs(newCol - col) ) {
                return true;
	    } else {
                System.out.println("Dont move\n");
		return false;
            }

    }
}
