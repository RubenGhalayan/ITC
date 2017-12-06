package figurs;

public class King extends Piece {
    private String type;
    private String color;
    public King(String type) {
        this.type = type;
	if(this.type == " k"){
            this.color = "white";
        } else {
            this.color = "black";
        }

    }

    public King(String type, int row, int col) {
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
            if((Math.abs(newCol - col) <=1 && Math.abs(newRow - row) <= 1) || (Math.abs(newRow - row) <= 1 && Math.abs(newCol - col) <= 1)) {
		return true;
            } else {
                System.out.println("Dont move\n");
		return false;
            }
    }
}
