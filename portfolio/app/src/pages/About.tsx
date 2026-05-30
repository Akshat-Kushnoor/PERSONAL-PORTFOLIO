
import { PairButton, PairButtonGroup } from "../components/buttons";

export default function About() {
    return(
        
            <div className="min-h-screen flex items-center justify-center relative text-white overflow-hidden px-6">
                
                <PairButtonGroup gap={4}>
                <PairButton variant="black">Start Project</PairButton>
                <PairButton variant="white">View Work</PairButton>
                </PairButtonGroup>
                <>About page</>
            </div>
         
    )
}
