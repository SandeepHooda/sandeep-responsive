package com;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class GAuth
 */
public class GAuth extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GAuth() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String message = "... ";
		String id_token = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImRmYTBlM2FmMGM0NjQ0MDRjM2VhNzk1Mjk1Mzg2NDVlNTYyNWVlZjMifQ.eyJhenAiOiIxNDAyMTQ2NDcwNjQtcW9hZ244bnMwOHI2NDU0aHNwNGNubmRwMHF0YjF1djEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIxNDAyMTQ2NDcwNjQtcW9hZ244bnMwOHI2NDU0aHNwNGNubmRwMHF0YjF1djEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDE5MzEwMjM4NjgzNTIyNDQ0MTQiLCJlbWFpbCI6InNvbnUuaG9vZGFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJLT1VqRG5SZDlDcHJwUXBkRU1qc0ZRIiwiaXNzIjoiYWNjb3VudHMuZ29vZ2xlLmNvbSIsImlhdCI6MTQ5MTkyNDY3MiwiZXhwIjoxNDkxOTI4MjcyLCJuYW1lIjoiU2FuZGVlcCBIb29kYSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vLV9tV2czOERhNDZJL0FBQUFBQUFBQUFJL0FBQUFBQUFBVkk0LzFsbHRlZEdvcHFBL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJTYW5kZWVwIiwiZmFtaWx5X25hbWUiOiJIb29kYSIsImxvY2FsZSI6ImVuLUdCIn0.jiKF12Vg0T_VhNR6DyFtlWc-Sg6hCcbfhdYm5LlLc6PhGweDAPauWr4HmDO18DfS_DBfX5qKNzz30prewk-LTtDNPeg6NzP-5CjsnG3ZmZCmFK4pT17rfunhQfzdidV7V4nUJC-rS-UdWo39q-qbRNbxDuxcYzJ1o2gBfGV-wkNl8-yuibyfyuwu_vj_WAAcwUbUp-9690s8dPZUw2SeYIZIem21Qbj2-F_cWH3fSiF0xx8IKDvJQTSrdLDJDsdZOEsZ51Lp_QSSnWY1Ui7NOiA_bKfPI9HXCLJSxMjjgO5kDeCNEZY_Z71tDtoT7BFqrEzhdgeCSNJJEeW8Y6sY1g";
		 URL url = new URL("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token="+req.getParameter("id_token") );
		 //URL url = new URL("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token="+id_token);
		
		 BufferedReader reader = new BufferedReader(new InputStreamReader(url.openStream()));
		 StringBuffer json = new StringBuffer();
		 String line;

		 while ((line = reader.readLine()) != null) {
		   json.append(line);
		 }
		 reader.close();
		    resp.setContentType("application/json");
			resp.getWriter().println(json.toString());
		    
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
