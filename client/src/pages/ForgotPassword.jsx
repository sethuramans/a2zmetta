
import Header from "../components/Header";
export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const handleSubmit = async (e) => {
      e.preventDefault();
      await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      alert('Check your email for reset instructions');
    };
  
    return (
      <div id="forgot-password" className="has-form">
        <Header title="Forgot Password?" />
        <div className="main-content container">
          <div className="row ">
            <div className="col-md-12 col-lg-6">
              <form onSubmit={handleSubmit}>
                <input
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Reset Password</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
  